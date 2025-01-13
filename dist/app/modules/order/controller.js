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
exports.orderController = void 0;
const services_1 = require("./services");
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield services_1.orderServices.getOrders(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: " order fetched successful",
        data: result,
    });
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.orderId;
    const result = yield services_1.orderServices.getOrder(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "single order fetched successful",
        data: result,
    });
});
const getUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const query = req.query;
    const result = yield services_1.orderServices.getUserOrder({ id, query });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "user order fetched successful",
        data: result,
    });
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.orderId;
    const result = yield services_1.orderServices.deleteOrder(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "order deleted successful",
        data: result,
    });
});
const getAdminStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.orderServices.getAdminStats();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "admin stats get successful",
        data: result,
    });
});
const deleteUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const result = yield services_1.orderServices.deleteOrder(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "user order deleted successful",
        data: result,
    });
});
exports.orderController = {
    getOrders,
    getOrder,
    deleteOrder,
    getUserOrder,
    deleteUserOrder,
    getAdminStats
};
