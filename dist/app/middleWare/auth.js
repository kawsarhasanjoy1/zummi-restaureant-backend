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
exports.auth = void 0;
const catchAsync_1 = __importDefault(require("../../shared/utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const model_1 = __importDefault(require("../modules/user/model"));
const AppError_1 = __importDefault(require("./AppError"));
const auth = (...Role) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(401, "Unauthorize user");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.access_token);
        const { role, name, email, id, iat } = decoded;
        const existId = yield model_1.default.findById({ _id: id });
        const existEmail = yield model_1.default.findOne({ email });
        if (!existId) {
            throw new AppError_1.default(401, "Unauthorize user");
        }
        if (!existEmail) {
            throw new AppError_1.default(401, "Unauthorized user please check your email");
        }
        if (Role && !Role.includes(role)) {
            throw new AppError_1.default(401, "Unauthorized user");
        }
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
