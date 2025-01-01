"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderUserValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
    }),
    city: zod_1.z.string(),
    contactNumber: zod_1.z.string(),
});
const OrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        paymentId: zod_1.z.string(),
        userId: zod_1.z.string(),
        email: zod_1.z.string().email(),
        price: zod_1.z.number().positive(),
        quantity: zod_1.z.number().int().positive(),
        productId: zod_1.z.array(zod_1.z.string()),
        userInfo: OrderUserValidationSchema,
    }),
});
exports.default = OrderValidationSchema;
// // Infer the TypeScript types from the Zod schemas if needed
// export type TOrder = z.infer<typeof OrderSchema>;
// export type TOrderUser = z.infer<typeof OrderUserSchema>;
