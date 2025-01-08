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
exports.chefServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../Builder/QueryBuilder"));
const model_1 = __importDefault(require("./model"));
const getChefs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = ["name", "title"];
    const searchQuery = new QueryBuilder_1.default(model_1.default.find(), query)
        .search(searchTerm)
        .filter()
        .sort()
        .pagination();
    const countTotal = yield searchQuery.countTotal();
    const result = yield searchQuery.QueryModel.populate("userId");
    return {
        countTotal,
        result,
    };
});
const getChef = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.findById(id);
    return result;
});
const deleteChef = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.findByIdAndDelete(id);
    return result;
});
const upChef = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.findByIdAndUpdate(id, {});
    return result;
});
exports.chefServices = {
    getChefs,
    getChef,
    deleteChef,
    upChef,
};
