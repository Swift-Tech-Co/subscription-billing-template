import { Request, Response, NextFunction } from "express";

export interface AuthedRequest extends Request {
  userId?: string;
  stripeCustomerId?: string;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }

  // Replace this stub with real JWT verification (jsonwebtoken, jose, etc.)
  // Example: const payload = jwt.verify(token, process.env.JWT_SECRET);
  const token = authHeader.slice(7);
  if (!token) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  // Attach user to request after verifying JWT
  req.userId = "user_placeholder";
  req.stripeCustomerId = "cus_placeholder";
  next();
}
