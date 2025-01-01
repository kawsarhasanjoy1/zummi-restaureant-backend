"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const chefValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    userId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
    email: zod_1.z.string(),
    title: zod_1.z.string(),
    experience: zod_1.z.string(),
    contactNumber: zod_1.z.string(),
    description: zod_1.z.string(),
    image: zod_1.z.string(),
    password: zod_1.z.string().optional(),
});
