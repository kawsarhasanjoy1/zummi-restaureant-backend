"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middleWare/auth"));
const constance_1 = require("../../constance/constance");
const activityRouter = (0, express_1.Router)();
activityRouter.get("/recent-activities", (0, auth_1.default)(constance_1.USER_ROLE.superAdmin, constance_1.USER_ROLE.admin, constance_1.USER_ROLE.chef, constance_1.USER_ROLE.user), controller_1.activityController.getActivity);
exports.default = activityRouter;
