"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const zoodMiddleware_1 = __importDefault(require("../../middleWare/zoodMiddleware"));
const reviewValidation_1 = __importDefault(require("./reviewValidation"));
const ReviewRouter = (0, express_1.Router)();
ReviewRouter.post("/create-review", (0, zoodMiddleware_1.default)(reviewValidation_1.default), controller_1.reviewController.createReview);
ReviewRouter.get("/get-reviews", controller_1.reviewController.getReviews);
exports.default = ReviewRouter;