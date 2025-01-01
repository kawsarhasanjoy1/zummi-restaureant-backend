"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const chefRouter = (0, express_1.Router)();
chefRouter.get('/get-chefs', controller_1.chefController.getChefs);
chefRouter.get('/get-chef/:chefId', controller_1.chefController.getChef);
chefRouter.delete('/delete-chef/:chefId', controller_1.chefController.deleteChef);
chefRouter.put('/up-chef/:chefId', controller_1.chefController.upChef);
exports.default = chefRouter;