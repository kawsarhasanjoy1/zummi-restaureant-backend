"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../shared/utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const model_1 = __importDefault(require("../modules/user/model"));
const AppError_1 = __importDefault(require("./AppError"));
const model_2 = require("../modules/recentActivity/model");
const auth = (...Role) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(401, "Unauthorize user");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token);
        const { role, name, email, id } = decoded;
        const existId = yield model_1.default.findById(id);
        if (!existId) {
            throw new AppError_1.default(401, "Unauthorized user");
        }
        if (Role.length && !Role.includes(role)) {
            throw new AppError_1.default(401, "Unauthorized user role");
        }
        req.user = decoded;
        ("create activity user for last active user");
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            console.warn("User ID is missing in the request.");
            return next();
        }
        const ipAddress = req.ip;
        const userAgent = req.headers["user-agent"] || "unknown";
        const path = req.originalUrl;
        const activityData = {
            userId: "",
            ipAddress: "",
            userAgent: "",
            path: "",
        };
        activityData["userId"] = userId;
        activityData["ipAddress"] = ipAddress;
        (activityData["path"] = path), (activityData["userAgent"] = userAgent);
        const isExistData = yield model_2.ActivityModel.findOne({
            userId: activityData === null || activityData === void 0 ? void 0 : activityData.userId,
        });
        if (!isExistData) {
            const result = yield model_2.ActivityModel.create(activityData);
            return result;
        }
        else {
            const result = yield model_2.ActivityModel.findOneAndUpdate({ userId: isExistData === null || isExistData === void 0 ? void 0 : isExistData.userId }, // Match by userId field
            { $set: { updatedAt: new Date() } }, // Update the updatedAt field
            { new: true } // Return the updated document
            );
        }
        next();
    }));
};
exports.default = auth;
