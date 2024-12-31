"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const UserZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, "Name is required")
            .max(100, "Name cannot exceed 100 characters"),
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .max(64, "Password cannot exceed 64 characters"),
        role: zod_1.z
            .enum(["user", "admin", "superAdmin"], { message: "Invalid role" })
            .default("user"),
        image: zod_1.z.string().url("Image must be a valid URL"),
    }),
});
exports.default = UserZodValidation;
