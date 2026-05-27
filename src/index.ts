import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import billingRouter from "./routes/billing";
import webhooksRouter from "./routes/webhooks";

const app = express();
const PORT = process.env.PORT ?? 4000;

// Webhook route needs raw body — must be registered before express.json()
app.post(
  "/webhooks/stripe",
  express.raw({ type: "application/json" }),
  webhooksRouter
);

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(",") ?? ["http://localhost:3000"] }));
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/health", (_req, res) => res.json({ status: "ok", ts: new Date().toISOString() }));

app.use("/billing", billingRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Subscription billing server running on http://localhost:${PORT}`);
});
