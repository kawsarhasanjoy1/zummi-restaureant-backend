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
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    const result = yield services_1.orderServices.createOrder(order);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "Order successful",
        data: result,
    });
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.orderServices.getOrders();
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
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.orderId;
    const result = yield services_1.orderServices.deleteOrder(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "order deleted successful",
        data: result,
    });
});
exports.orderController = {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
};
