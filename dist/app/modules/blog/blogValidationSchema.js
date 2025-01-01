"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidationSchema = void 0;
const zod_1 = require("zod");
exports.blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        image: zod_1.z.string(),
    }),
});
