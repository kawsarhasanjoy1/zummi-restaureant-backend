"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const constance_1 = require("../../constance/constance");
const OrderRouter = (0, express_1.Router)();
OrderRouter.get("/get-orders", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin, constance_1.USER_ROLE.chef), controller_1.orderController.getOrders);
OrderRouter.get("/get-order/:orderId", controller_1.orderController.getOrder);
OrderRouter.get("/get-user-order/:userId", (0, auth_1.default)(constance_1.USER_ROLE.user), controller_1.orderController.getUserOrder);
OrderRouter.delete("/delete-user-order/:userId", (0, auth_1.default)(constance_1.USER_ROLE.user), controller_1.orderController.deleteUserOrder);
OrderRouter.get("/get-user-stats/:userId", (0, auth_1.default)(constance_1.USER_ROLE.user), controller_1.orderController.getUserStats);
OrderRouter.get("/get-chef-stats", (0, auth_1.default)(constance_1.USER_ROLE.chef), controller_1.orderController.getChefStats);
OrderRouter.get("/get-admin-stats", (0, auth_1.default)(constance_1.USER_ROLE.superAdmin, constance_1.USER_ROLE.admin), controller_1.orderController.getAdminStats);
OrderRouter.delete("/delete-order/:orderId", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.orderController.deleteOrder);
exports.default = OrderRouter;
