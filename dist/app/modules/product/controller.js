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
exports.productController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const service_1 = require("./service");
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const result = yield service_1.productServices.CreateProduct(product);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "Product created successful",
        data: result,
    });
}));
const getProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.productServices.getProducts();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Product fetched successful",
        data: result,
    });
}));
const getProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    const result = yield service_1.productServices.getProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "single product fetched successful",
        data: result,
    });
}));
const upProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    const up = req.body;
    const result = yield service_1.productServices.upProduct(id, up);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: " product update fetched successful",
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    const result = yield service_1.productServices.DeleteProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: " product delete successful",
        data: result,
    });
}));
exports.productController = {
    createProduct,
    getProducts,
    getProduct,
    upProduct,
    deleteProduct,
};
