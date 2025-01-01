"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
const ingredientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    quantity: zod_1.z.string(),
});
const additionalInfoSchema = zod_1.z.object({
    calories: zod_1.z.number(),
    protein: zod_1.z.string(),
    totalFat: zod_1.z.string(),
    size: zod_1.z.string(),
});
exports.productSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        title: zod_1.z.string(),
        category: zod_1.z.string(),
        userId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format").optional(),
        price: zod_1.z.number().positive(),
        ingredients: zod_1.z.array(ingredientSchema),
        description: zod_1.z.string(),
        image: zod_1.z.string(),
        additionalInfo: additionalInfoSchema,
    }),
});
// export type TProduct = z.infer<typeof productSchema>;
