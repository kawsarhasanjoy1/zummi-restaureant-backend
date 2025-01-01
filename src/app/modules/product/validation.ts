import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
});

const additionalInfoSchema = z.object({
  calories: z.number(),
  protein: z.string(),
  totalFat: z.string(),
  size: z.string(),
});

export const productSchema = z.object({
  body: z.object({
    name: z.string(),
    title: z.string(),
    category: z.string(),
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
    price: z.number().positive(),
    ingredients: z.array(ingredientSchema),
    description: z.string(),
    image: z.string(),
    additionalInfo: additionalInfoSchema,
  }),
});

// export type TProduct = z.infer<typeof productSchema>;
