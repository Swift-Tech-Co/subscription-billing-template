import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is required");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const PLANS = {
  starter: {
    name: "Starter",
    priceId: process.env.STRIPE_PRICE_STARTER ?? "",
    features: ["5 projects", "10GB storage", "Email support"],
  },
  pro: {
    name: "Pro",
    priceId: process.env.STRIPE_PRICE_PRO ?? "",
    features: ["Unlimited projects", "100GB storage", "Priority support", "API access"],
  },
  enterprise: {
    name: "Enterprise",
    priceId: process.env.STRIPE_PRICE_ENTERPRISE ?? "",
    features: ["Everything in Pro", "Custom SLA", "Dedicated support", "SSO"],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
