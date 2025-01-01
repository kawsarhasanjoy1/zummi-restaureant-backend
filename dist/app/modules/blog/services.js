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
exports.blogServices = void 0;
const AppError_1 = __importDefault(require("../../middleWare/AppError"));
const model_1 = __importDefault(require("./model"));
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.create(payload);
    return result;
});
const getBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.find();
    return result;
});
const getBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.findById({ id });
    if (!result) {
        throw new AppError_1.default(404, 'Product dose not exist');
    }
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(404, 'Product dose not exist');
    }
});
exports.blogServices = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
};
