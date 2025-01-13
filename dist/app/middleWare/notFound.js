"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// NotFound Middleware
const notFound = (req, res, next) => {
    // SSLCommerz success, fail, and cancel routes allow
    if (req.originalUrl.startsWith("/payment/success") ||
        req.originalUrl.startsWith("/payment/fail") ||
        req.originalUrl.startsWith("/payment/cancel")) {
        return next(); // Allow these routes
    }
    // For all other unmatched routes
    res.status(404).json({
        success: false,
        message: `${req.originalUrl} api not found`,
    });
};
exports.default = notFound;
