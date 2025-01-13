"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const constance_1 = require("../../constance/constance");
const chefRouter = (0, express_1.Router)();
chefRouter.get('/get-chefs', controller_1.chefController.getChefs);
chefRouter.get('/get-chef/:chefId', controller_1.chefController.getChef);
chefRouter.delete('/delete-chef/:chefId', (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.chefController.deleteChef);
chefRouter.put('/up-chef/:chefId', (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.chefController.upChef);
exports.default = chefRouter;
