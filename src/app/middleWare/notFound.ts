import { Request, Response, NextFunction } from "express";

// NotFound Middleware
const notFound = (req: Request, res: Response, next: NextFunction) => {
  // SSLCommerz success, fail, and cancel routes allow
  if (
    req.originalUrl.startsWith("/payment/success") ||
    req.originalUrl.startsWith("/payment/fail") ||
    req.originalUrl.startsWith("/payment/cancel")
  ) {
    return next(); // Allow these routes
  }

  // For all other unmatched routes
  res.status(404).json({
    success: false,
    message: `${req.originalUrl} api not found`,
  });
};

export default notFound;
