"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const zoodMiddleware_1 = __importDefault(require("../../middleWare/zoodMiddleware"));
const LoginUserSchema_1 = require("./LoginUserSchema");
const auth_1 = require("../../middleWare/auth");
const constance_1 = require("../../constance/constance");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/login", (0, zoodMiddleware_1.default)(LoginUserSchema_1.TLoginUserSchema), controller_1.authController.loginController);
AuthRouter.post("/change-password", (0, auth_1.auth)(constance_1.USER_ROLE.user, constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin, constance_1.USER_ROLE.chef), controller_1.authController.changePassword);
exports.default = AuthRouter;
