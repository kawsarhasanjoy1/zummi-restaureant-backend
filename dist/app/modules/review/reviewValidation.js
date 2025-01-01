"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const objectIdSchema = zod_1.z.custom((value) => mongoose_1.Types.ObjectId.isValid(value), { message: "Invalid ObjectId" });
const TReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: objectIdSchema,
        user: objectIdSchema,
        rating: zod_1.z
            .number()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5"),
        review: zod_1.z.string().min(1, "Review cannot be empty"),
    }),
});
exports.default = TReviewValidationSchema;
