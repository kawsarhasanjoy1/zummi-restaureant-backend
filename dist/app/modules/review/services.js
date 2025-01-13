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
exports.reviewServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../Builder/QueryBuilder"));
const model_1 = __importDefault(require("./model"));
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.create(payload);
    if (result) {
        yield model_1.default.calcAverageRatings(result.productId);
    }
    return result;
});
const getReviews = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = ["rating"];
    const searchQuery = new QueryBuilder_1.default(model_1.default.find(), query)
        .search(searchTerm)
        .filter()
        .sort()
        .pagination();
    const countTotal = yield searchQuery.countTotal();
    const result = yield searchQuery.QueryModel.populate("productId").populate("user");
    return {
        countTotal,
        result,
    };
});
const getUserReviews = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, query }) {
    const searchTerm = ["rating"];
    const searchQuery = new QueryBuilder_1.default(model_1.default.find({ user: id }), query)
        .search(searchTerm)
        .filter()
        .sort()
        .pagination();
    const countTotal = yield searchQuery.countTotal();
    const result = yield searchQuery.QueryModel.populate("productId").populate("user");
    return {
        countTotal,
        result,
    };
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.findByIdAndDelete(id);
    return result;
});
exports.reviewServices = {
    createReview,
    getReviews,
    getUserReviews,
    deleteReview,
};
