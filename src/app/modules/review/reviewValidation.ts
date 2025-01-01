import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.custom<Types.ObjectId>(
  (value) => Types.ObjectId.isValid(value),
  { message: "Invalid ObjectId" }
);

const TReviewValidationSchema = z.object({
  body: z.object({
    productId: objectIdSchema,
    user: objectIdSchema,
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    review: z.string().min(1, "Review cannot be empty"),
  }),
});

export default TReviewValidationSchema;
