"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const zod_validation_1 = __importDefault(require("./zod-validation"));
const zoodMiddleware_1 = __importDefault(require("../../middleWare/zoodMiddleware"));
const auth_1 = require("../../middleWare/auth");
const constance_1 = require("../../constance/constance");
const userRouter = (0, express_1.Router)();
userRouter.post("/create-chef", controller_1.userController.createChef);
userRouter.post("/create-user", (0, zoodMiddleware_1.default)(zod_validation_1.default), controller_1.userController.createUser);
userRouter.get("/all-user", (0, auth_1.auth)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.userController.getAllUser);
userRouter.get("/fetch-users", controller_1.userController.fetchAllUser);
userRouter.get("/get-single-user/:userId", controller_1.userController.getSingleUser);
userRouter.delete("/delete-user/:userId", 
// auth(USER_ROLE.admin, USER_ROLE.superAdmin),
controller_1.userController.deleteUser);
userRouter.post("/update-user/:userId", (0, auth_1.auth)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin, constance_1.USER_ROLE.user), controller_1.userController.UpdateUser);
userRouter.post("/update-role/:userId", (0, auth_1.auth)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.userController.UpdateRole);
exports.default = userRouter;
