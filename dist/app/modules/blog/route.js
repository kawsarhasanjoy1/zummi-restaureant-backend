"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const zoodMiddleware_1 = __importDefault(require("../../middleWare/zoodMiddleware"));
const blogValidationSchema_1 = require("./blogValidationSchema");
const BlogRouter = (0, express_1.Router)();
BlogRouter.post("/create-blog", (0, zoodMiddleware_1.default)(blogValidationSchema_1.blogValidationSchema), controller_1.blogController.createBlog);
BlogRouter.get("/get-blogs", controller_1.blogController.getBlogs);
BlogRouter.get("/get-blog/:blogId", controller_1.blogController.getBlog);
BlogRouter.delete("/delete-blog/:blogId", controller_1.blogController.deleteBlog);
exports.default = BlogRouter;
