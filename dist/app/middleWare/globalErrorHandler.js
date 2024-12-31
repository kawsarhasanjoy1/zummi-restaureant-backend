"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const HandleZodError_1 = __importDefault(require("../errors/HandleZodError"));
const HandleCastError_1 = __importDefault(require("../errors/HandleCastError"));
const HandleMongooseError_1 = __importDefault(require("../errors/HandleMongooseError"));
const globalErrorHandler = (error, req, res, next) => {
    let status = 500;
    let message = (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplified = (0, HandleZodError_1.default)(error);
        (status = simplified.statusCode),
            (message = simplified === null || simplified === void 0 ? void 0 : simplified.message),
            (errorSources = simplified === null || simplified === void 0 ? void 0 : simplified.errorSources);
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const simplified = (0, HandleCastError_1.default)(error);
        (status = simplified.statusCode),
            (message = simplified.message),
            (errorSources = simplified.errorSources);
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const simplified = (0, HandleMongooseError_1.default)(error);
        (status = simplified.statusCode),
            (message = simplified.message),
            (errorSources = simplified.errorSources);
    }
    res.status(status).json({
        success: false,
        message,
        errorSources,
    });
};
exports.globalErrorHandler = globalErrorHandler;
