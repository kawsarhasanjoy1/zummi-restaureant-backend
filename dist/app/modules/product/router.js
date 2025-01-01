"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const zoodMiddleware_1 = __importDefault(require("../../middleWare/zoodMiddleware"));
const validation_1 = require("./validation");
const auth_1 = require("../../middleWare/auth");
const constance_1 = require("../../constance/constance");
const ProductRouter = (0, express_1.Router)();
ProductRouter.post("/create-product", (0, auth_1.auth)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), (0, zoodMiddleware_1.default)(validation_1.productSchema), controller_1.productController.createProduct);
ProductRouter.get("/get-products", controller_1.productController.getProducts);
ProductRouter.get("/get-product/:productId", (0, auth_1.auth)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin, constance_1.USER_ROLE.user), controller_1.productController.getProduct);
ProductRouter.post("/update-product/:productId", (0, auth_1.auth)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.productController.upProduct);
ProductRouter.delete("/delete-product/:productId", (0, auth_1.auth)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.productController.deleteProduct);
exports.default = ProductRouter;
