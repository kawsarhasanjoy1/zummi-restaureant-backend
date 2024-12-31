"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: true,
        message: data.message,
        data: data === null || data === void 0 ? void 0 : data.data,
    });
};
exports.default = sendResponse;