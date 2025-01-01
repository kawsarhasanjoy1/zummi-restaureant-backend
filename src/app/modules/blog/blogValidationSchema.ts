import { z } from "zod";

export const blogValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});
