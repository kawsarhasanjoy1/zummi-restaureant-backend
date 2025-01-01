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
exports.productServices = void 0;
const AppError_1 = __importDefault(require("../../middleWare/AppError"));
const model_1 = __importDefault(require("./model"));
const CreateProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.create(payload);
    return result;
});
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.find().populate("reviews");
    return result;
});
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.findById(id);
    return result;
});
const upProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistId = model_1.default.findOne({ _id: id });
    if (!isExistId) {
        throw new AppError_1.default(404, "This product is not exist");
    }
    const result = yield model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
const DeleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistId = model_1.default.findOne({ _id: id });
    if (!isExistId) {
        throw new AppError_1.default(404, "This product is not exist");
    }
    const result = yield model_1.default.findByIdAndDelete(id, { new: true });
    return result;
});
exports.productServices = {
    CreateProduct,
    getProducts,
    getProduct,
    upProduct,
    DeleteProduct,
};
