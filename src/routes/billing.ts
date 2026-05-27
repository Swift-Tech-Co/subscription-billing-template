import { Router, Response } from "express";
import { stripe, PLANS, PlanKey } from "../lib/stripe";
import { requireAuth, AuthedRequest } from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);

// GET /billing/plans — list available plans
router.get("/plans", (_req, res: Response) => {
  res.json({
    plans: Object.entries(PLANS).map(([key, plan]) => ({
      key,
      name: plan.name,
      priceId: plan.priceId,
      features: plan.features,
    })),
  });
});

// POST /billing/checkout — create a Stripe Checkout session
router.post("/checkout", async (req: AuthedRequest, res: Response): Promise<void> => {
  const { planKey, successUrl, cancelUrl } = req.body as {
    planKey: PlanKey;
    successUrl: string;
    cancelUrl: string;
  };

  const plan = PLANS[planKey];
  if (!plan) {
    res.status(400).json({ error: "Invalid plan" });
    return;
  }
  if (!plan.priceId) {
    res.status(500).json({ error: `STRIPE_PRICE_${planKey.toUpperCase()} not configured` });
    return;
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: plan.priceId, quantity: 1 }],
    customer: req.stripeCustomerId,
    success_url: successUrl + "?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: { userId: req.userId ?? "", plan: planKey },
    },
  });

  res.json({ sessionId: session.id, url: session.url });
});

// POST /billing/portal — create a customer portal session
router.post("/portal", async (req: AuthedRequest, res: Response): Promise<void> => {
  const { returnUrl } = req.body as { returnUrl: string };

  if (!req.stripeCustomerId) {
    res.status(400).json({ error: "No Stripe customer associated with this account" });
    return;
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: req.stripeCustomerId,
    return_url: returnUrl,
  });

  res.json({ url: session.url });
});

// GET /billing/subscription — get current subscription status
router.get("/subscription", async (req: AuthedRequest, res: Response): Promise<void> => {
  if (!req.stripeCustomerId) {
    res.json({ subscription: null });
    return;
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: req.stripeCustomerId,
    status: "active",
    limit: 1,
    expand: ["data.default_payment_method"],
  });

  const sub = subscriptions.data[0] ?? null;
  if (!sub) {
    res.json({ subscription: null });
    return;
  }

  res.json({
    subscription: {
      id: sub.id,
      status: sub.status,
      plan: sub.metadata.plan,
      currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString(),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
});

// DELETE /billing/subscription — cancel at period end
router.delete("/subscription", async (req: AuthedRequest, res: Response): Promise<void> => {
  if (!req.stripeCustomerId) {
    res.status(400).json({ error: "No subscription found" });
    return;
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: req.stripeCustomerId,
    status: "active",
    limit: 1,
  });

  const sub = subscriptions.data[0];
  if (!sub) {
    res.status(404).json({ error: "No active subscription found" });
    return;
  }

  const updated = await stripe.subscriptions.update(sub.id, {
    cancel_at_period_end: true,
  });

  res.json({
    message: "Subscription will cancel at end of billing period",
    cancelAt: new Date(updated.cancel_at! * 1000).toISOString(),
  });
});

export default router;
