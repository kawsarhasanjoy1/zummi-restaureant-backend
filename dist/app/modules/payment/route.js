"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const constance_1 = require("../../constance/constance");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const paymentRouter = (0, express_1.Router)();
paymentRouter.post("/create-payment-order", controller_1.paymentController.createPayment);
paymentRouter.post("/payment/success/:tranId", controller_1.paymentController.updateStatus);
paymentRouter.post("/payment/fail/:tranId", controller_1.paymentController.failedPayment);
paymentRouter.get("/get-payments", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin, constance_1.USER_ROLE.chef), controller_1.paymentController.getPayments);
paymentRouter.get("/get-payment/:userId", (0, auth_1.default)(constance_1.USER_ROLE.user), controller_1.paymentController.getPayments);
exports.default = paymentRouter;
