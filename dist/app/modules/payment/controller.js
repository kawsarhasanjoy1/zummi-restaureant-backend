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
exports.paymentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/utils/catchAsync"));
const services_1 = require("./services");
const config_1 = __importDefault(require("../../../config/config"));
const model_1 = require("../order/model");
const model_2 = __importDefault(require("../product/model"));
const AppError_1 = __importDefault(require("../../middleWare/AppError"));
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const model_3 = require("./model");
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = config_1.default.store_id;
const store_passwd = config_1.default.store_pass;
const is_live = false;
const createPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = req.body;
    const result = yield services_1.paymentServices.createPayment(payment);
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz
        .init(result)
        .then((apiResponse) => {
        const GatewayPageURL = apiResponse.GatewayPageURL;
        const tran_id = result.tran_id;
        model_1.orderModel.create(Object.assign(Object.assign({}, payment), { transactionId: tran_id }));
        res.status(200).json({ url: GatewayPageURL });
    })
        .catch((error) => {
        res.status(500).json({ message: "Payment initialization failed", error });
    });
}));
const updateStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.tranId;
    const findOrder = (yield model_1.orderModel.findOne({
        transactionId: transactionId,
    }));
    const productId = yield Promise.all(findOrder === null || findOrder === void 0 ? void 0 : findOrder.products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield model_2.default.findByIdAndUpdate(product === null || product === void 0 ? void 0 : product.productId, {
            $inc: { stock: -(product === null || product === void 0 ? void 0 : product.quantity) },
        });
        res.redirect(`https://zummi-restaureant.vercel.app/success/${findOrder === null || findOrder === void 0 ? void 0 : findOrder.transactionId}`);
        return result;
    })));
    const updatedOrder = yield model_1.orderModel.findOneAndUpdate({ transactionId: transactionId }, { status: true }, { new: true, runValidators: true });
    if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
    }
    const payment = {
        orderId: findOrder === null || findOrder === void 0 ? void 0 : findOrder._id,
        userId: findOrder === null || findOrder === void 0 ? void 0 : findOrder.userId,
        transactionId: findOrder === null || findOrder === void 0 ? void 0 : findOrder.transactionId,
        quantity: findOrder === null || findOrder === void 0 ? void 0 : findOrder.quantity,
        price: findOrder === null || findOrder === void 0 ? void 0 : findOrder.price,
        name: findOrder === null || findOrder === void 0 ? void 0 : findOrder.name,
        number: findOrder === null || findOrder === void 0 ? void 0 : findOrder.number,
        district: findOrder === null || findOrder === void 0 ? void 0 : findOrder.district,
        subdistrict: findOrder === null || findOrder === void 0 ? void 0 : findOrder.subdistrict,
    };
    const paymentResult = yield model_3.paymentModel.create(payment);
    if (!productId.length || !paymentResult) {
        throw new AppError_1.default(404, "Dose not update product");
    }
    res.status(200).json({
        success: true,
        message: "Payment successful",
        order: updatedOrder,
    });
}));
// Handle Payment Fail
const failedPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.tranId;
    const updatedOrder = yield model_1.orderModel.findOneAndUpdate({ transactionId }, { status: false }, { new: true, runValidators: true });
    if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
    }
    console.log("Payment Failed:", updatedOrder);
    res.status(200).json({
        success: false,
        message: "Payment failed",
        order: updatedOrder,
    });
}));
const getPayments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield services_1.paymentServices.getPayments(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "payment faced successful",
        data: result,
    });
}));
const getUserPayments = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
    const query = req === null || req === void 0 ? void 0 : req.query;
    const result = yield services_1.paymentServices.getUserPayments({ id, query });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "payment faced successful",
        data: result,
    });
}));
exports.paymentController = {
    createPayment,
    updateStatus,
    failedPayment,
    getPayments,
    getUserPayments,
};
