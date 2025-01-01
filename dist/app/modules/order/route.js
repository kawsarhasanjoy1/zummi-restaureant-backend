"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const zoodMiddleware_1 = __importDefault(require("../../middleWare/zoodMiddleware"));
const orderValidationSchema_1 = __importDefault(require("./orderValidationSchema"));
const OrderRouter = (0, express_1.Router)();
OrderRouter.post("/create-order", (0, zoodMiddleware_1.default)(orderValidationSchema_1.default), controller_1.orderController.createOrder);
OrderRouter.get("/get-orders", controller_1.orderController.getOrders);
OrderRouter.get("/get-order/:orderId", controller_1.orderController.getOrder);
OrderRouter.delete("/delete-order/:orderId", controller_1.orderController.deleteOrder);
exports.default = OrderRouter;
