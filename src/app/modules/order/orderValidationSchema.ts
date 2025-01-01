import { z } from "zod";

const OrderUserValidationSchema = z.object({
  email: z.string().email(),
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  city: z.string(),
  contactNumber: z.string(),
});

const OrderValidationSchema = z.object({
  body: z.object({
    paymentId: z.string(),
    userId: z.string(),
    email: z.string().email(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    productId: z.array(z.string()),
    userInfo: OrderUserValidationSchema,
  }),
});

export default OrderValidationSchema;

// // Infer the TypeScript types from the Zod schemas if needed
// export type TOrder = z.infer<typeof OrderSchema>;
// export type TOrderUser = z.infer<typeof OrderUserSchema>;
