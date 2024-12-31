"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller"); // Adjust based on your actual path
const zod_validation_1 = __importDefault(require("./zod-validation")); // Adjust based on your actual path
const zoodMiddleware_1 = __importDefault(require("../../middleWare/zoodMiddleware"));
const userRouter = (0, express_1.Router)();
userRouter.post("/create-user", (0, zoodMiddleware_1.default)(zod_validation_1.default), controller_1.userController.createUser); // Apply validation middleware
userRouter.get("/all-user", controller_1.userController.getAllUser);
userRouter.get("/get-single-user/:userId", controller_1.userController.getSingleUser);
userRouter.get("/delete-user/:userId", controller_1.userController.deleteUser);
exports.default = userRouter;
