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
exports.paymentServices = void 0;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../../../config/config"));
const model_1 = require("./model");
const QueryBuilder_1 = __importDefault(require("../../Builder/QueryBuilder"));
const tran_id = new mongodb_1.ObjectId().toString();
const createPayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        total_amount: payload.price,
        currency: "BDT",
        tran_id: tran_id, // unique tran_id
        success_url: `${config_1.default.base_url}/payment/success/${tran_id}`,
        fail_url: `${config_1.default.base_url}/payment/fail/${tran_id}`,
        cancel_url: `${config_1.default.base_url}/payment/cancel/${tran_id}`,
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: payload.name,
        cus_email: payload.email,
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: payload.number,
        cus_fax: "01711111111",
        ship_name: payload.name,
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
    };
    return data;
});
const getPayments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = ["name", "category"];
    const searchQuery = new QueryBuilder_1.default(model_1.paymentModel.find(), query)
        .search(searchTerm)
        .filter()
        .sort()
        .pagination();
    const meta = yield searchQuery.countTotal();
    const result = yield searchQuery.QueryModel.populate("productId").populate("userId");
    return { result, meta };
});
const getUserPayments = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, query }) {
    const searchTerm = ['name', 'number', 'category'];
    const searchQuery = new QueryBuilder_1.default(model_1.paymentModel.find({ userId: id }), query).search(searchTerm).filter().pagination().sort();
    const result = yield searchQuery.QueryModel.populate("userId").populate("products.productId");
    const meta = yield searchQuery.countTotal();
    return {
        result,
        meta,
    };
});
exports.paymentServices = {
    createPayment,
    getPayments,
    getUserPayments,
};
