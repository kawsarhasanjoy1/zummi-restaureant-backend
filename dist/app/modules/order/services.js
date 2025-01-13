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
exports.orderServices = void 0;
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = __importDefault(require("../../Builder/QueryBuilder"));
const model_1 = __importDefault(require("../blog/model"));
const model_2 = __importDefault(require("../chef/model"));
const model_3 = __importDefault(require("../product/model"));
const model_4 = __importDefault(require("../review/model"));
const model_5 = __importDefault(require("../user/model"));
const model_6 = require("./model");
const getOrders = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = ["name", "email"];
    const searchQuery = new QueryBuilder_1.default(model_6.orderModel.find(), query)
        .search(searchTerm)
        .filter()
        .sort()
        .pagination();
    const meta = yield searchQuery.countTotal();
    const result = yield searchQuery.QueryModel.populate("products.productId").populate("userId");
    return {
        meta,
        result,
    };
});
const getOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_6.orderModel.findById(id);
    return result;
});
const getUserOrder = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, query }) {
    const searchTerm = ["name", "number", "category"];
    const searchQuery = new QueryBuilder_1.default(model_6.orderModel.find({ userId: id }), query)
        .search(searchTerm)
        .filter()
        .pagination()
        .sort();
    const result = yield searchQuery.QueryModel.populate("userId").populate("products.productId");
    const meta = yield searchQuery.countTotal();
    return {
        result,
        meta,
    };
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_6.orderModel.findByIdAndDelete(id);
    return result;
});
const getUserStats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const orderStats = yield model_6.orderModel.aggregate([
        {
            $match: { userId: new mongoose_1.Types.ObjectId(userId) }, // Ensure proper type
        },
        { $unwind: "$products" },
        {
            $lookup: {
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "productDetails",
            },
        },
        { $unwind: "$productDetails" },
        {
            $group: {
                _id: "$productDetails.category",
                totalPrice: {
                    $sum: { $multiply: ["$products.quantity", "$productDetails.price"] },
                },
                totalOrder: { $sum: "$products.quantity" },
            },
        },
    ]);
    const totalReview = yield model_4.default.countDocuments({ user: userId });
    return {
        orderDetails: orderStats,
        totalPrice: ((_a = orderStats[0]) === null || _a === void 0 ? void 0 : _a.totalPrice) || 0,
        totalOrder: ((_b = orderStats[0]) === null || _b === void 0 ? void 0 : _b.totalOrder) || 0,
        totalReview,
    };
});
const getChefStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield model_6.orderModel
        .find()
        .populate("products.productId");
    const orderDetails = yield model_6.orderModel.aggregate([
        { $unwind: "$products" },
        {
            $lookup: {
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "productDetails",
            },
        },
        { $unwind: "$productDetails" },
        {
            $group: {
                _id: "$productDetails.category",
                count: { $sum: "$products.quantity" },
                totalPrice: {
                    $sum: { $multiply: ["$products.quantity", "$productDetails.price"] },
                },
            },
        },
    ]);
    const totalOrder = orders.reduce((acc, cur) => acc + cur.quantity, 0);
    const totalProduct = yield model_3.default.estimatedDocumentCount();
    const totalReview = yield model_4.default.estimatedDocumentCount();
    const totalChef = yield model_2.default.estimatedDocumentCount();
    return {
        orderDetails,
        totalOrder,
        totalReview,
        totalProduct,
        totalChef,
    };
});
const getAdminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield model_6.orderModel
        .find()
        .populate("products.productId");
    const orderDetails = yield model_6.orderModel.aggregate([
        { $unwind: "$products" },
        {
            $lookup: {
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "productDetails",
            },
        },
        { $unwind: "$productDetails" },
        {
            $group: {
                _id: "$productDetails.category",
                count: { $sum: "$products.quantity" },
                totalPrice: {
                    $sum: { $multiply: ["$products.quantity", "$productDetails.price"] },
                },
            },
        },
    ]);
    const totalOrder = orders.reduce((acc, cur) => acc + cur.quantity, 0);
    const totalPrice = orders.reduce((acc, cur) => acc + cur.price, 0);
    const totalProduct = yield model_3.default.estimatedDocumentCount();
    const totalUser = yield model_5.default.estimatedDocumentCount();
    const totalReview = yield model_4.default.estimatedDocumentCount();
    const totalBlog = yield model_1.default.estimatedDocumentCount();
    const totalChef = yield model_2.default.estimatedDocumentCount();
    return {
        orders,
        orderDetails,
        totalOrder,
        totalUser,
        totalReview,
        totalPrice,
        totalProduct,
        totalBlog,
        totalChef,
    };
});
const deleteUserOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_6.orderModel.findByIdAndDelete({ userId: id });
    return result;
});
exports.orderServices = {
    getOrders,
    getOrder,
    deleteOrder,
    getUserOrder,
    deleteUserOrder,
    getAdminStats,
    getUserStats,
    getChefStats,
};
