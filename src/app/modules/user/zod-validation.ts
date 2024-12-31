import { z } from "zod";

const UserZodValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name cannot exceed 100 characters"),
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(64, "Password cannot exceed 64 characters"),
    role: z
      .enum(["user", "admin", "superAdmin"], { message: "Invalid role" })
      .default("user"),
    image: z.string().url("Image must be a valid URL"),
  }),
});

export default UserZodValidation;
