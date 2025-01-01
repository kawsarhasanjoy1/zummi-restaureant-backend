import { z } from "zod";

const chefValidationSchema = z.object({
  name: z.string(),
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
  email: z.string(),
  title: z.string(),
  experience: z.string(),
  contactNumber: z.string(),
  description: z.string(),
  image: z.string(),
  password: z.string().optional(),
});
