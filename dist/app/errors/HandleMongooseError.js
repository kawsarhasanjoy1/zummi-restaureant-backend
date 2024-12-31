"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleMongooseError = (err) => {
    const errorSources = Object.values(err === null || err === void 0 ? void 0 : err.errors).map((value) => {
        return {
            path: value === null || value === void 0 ? void 0 : value.path,
            message: value === null || value === void 0 ? void 0 : value.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: err === null || err === void 0 ? void 0 : err.message,
        errorSources,
    };
};
exports.default = HandleMongooseError;
