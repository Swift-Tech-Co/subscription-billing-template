import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";

const router = Router();

// Use raw body for Stripe signature verification — must be before express.json()
router.post(
  "/",
  // express.raw() must be applied at the route level or globally before express.json()
  (req: Request, res: Response): void => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      res.status(400).json({ error: "Missing stripe-signature or webhook secret" });
      return;
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(400).json({ error: `Webhook signature verification failed: ${message}` });
      return;
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        handleCheckoutComplete(session);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        handleSubscriptionChange(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        handleSubscriptionCancelled(subscription);
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        handlePaymentSucceeded(invoice);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        handlePaymentFailed(invoice);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

function handleCheckoutComplete(session: Stripe.Checkout.Session): void {
  const { userId, plan } = session.metadata ?? {};
  console.log(`Checkout complete: user=${userId} plan=${plan} customer=${session.customer}`);
  // TODO: update user record with stripeCustomerId and plan
}

function handleSubscriptionChange(subscription: Stripe.Subscription): void {
  const { userId, plan } = subscription.metadata;
  console.log(`Subscription ${subscription.status}: user=${userId} plan=${plan}`);
  // TODO: update user's plan and subscription status in DB
}

function handleSubscriptionCancelled(subscription: Stripe.Subscription): void {
  const { userId } = subscription.metadata;
  console.log(`Subscription cancelled: user=${userId}`);
  // TODO: downgrade user to free tier
}

function handlePaymentSucceeded(invoice: Stripe.Invoice): void {
  console.log(`Payment succeeded: customer=${invoice.customer} amount=${invoice.amount_paid}`);
  // TODO: send receipt email, update billing history
}

function handlePaymentFailed(invoice: Stripe.Invoice): void {
  console.log(`Payment failed: customer=${invoice.customer} attempt=${invoice.attempt_count}`);
  // TODO: send dunning email, flag account for review
}

export default router;
