"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLoginUserSchema = void 0;
const zod_1 = require("zod");
exports.TLoginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email format"),
        password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
    }),
});
