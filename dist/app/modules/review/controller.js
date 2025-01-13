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
exports.reviewController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/utils/catchAsync"));
const services_1 = require("./services");
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = req.body;
    const result = yield services_1.reviewServices.createReview(review);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "review created successful",
        data: result,
    });
}));
const getReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.reviewServices.getReviews(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "review fetched successful",
        data: result,
    });
}));
const getUserReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const id = req.params.userId;
    const result = yield services_1.reviewServices.getUserReviews({ id, query });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "review fetched successful",
        data: result,
    });
}));
const deleteReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield services_1.reviewServices.deleteReview((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.reviewId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "review deleted successful",
        data: result,
    });
}));
exports.reviewController = {
    createReview,
    getReviews,
    getUserReview,
    deleteReviews
};
