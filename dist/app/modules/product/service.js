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
const QueryBuilder_1 = __importDefault(require("../../Builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../middleWare/AppError"));
const model_1 = __importDefault(require("./model"));
const CreateProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.create(payload);
    return result;
});
const getProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchField = ["name", "category"];
    // const objQuery = { ...query }; //copy query
    // let searchTerm = "";
    // if (query?.searchTerm) {
    //   searchTerm = query.searchTerm as string;
    // }
    // const excludeField = ["searchTerm", "sort", "limit", "page"];
    // excludeField.forEach((el) => delete objQuery[el]);
    // const searchQuery = ProductModel.find({
    //   $or: ["name", "category"].map((field) => ({
    //     [field]: { $regex: searchTerm, $options: "i" },
    //   })),
    // });
    // const filterQuery = searchQuery.find(objQuery).populate("reviews");
    // let sort = "-createdAt";
    // if (query?.sort) {
    //   sort = query.sort as string;
    // }
    // let limit = 1;
    // let page = 1;
    // let skip = 0;
    // if (query.limit) {
    //   limit = Number(query.limit);
    // }
    // if (query?.page) {
    //   page = Number(query?.page);
    //   skip = (page - 1) * limit;
    // }
    // const sortQuery = filterQuery.sort(sort);
    // const paginationQuery = sortQuery.skip(skip);
    // const limitQuery = await paginationQuery.limit(limit);
    const productQuery = new QueryBuilder_1.default(model_1.default.find(), query)
        .search(searchField)
        .filter()
        .sort()
        .pagination();
    const result = yield productQuery.QueryModel.populate("reviews");
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
