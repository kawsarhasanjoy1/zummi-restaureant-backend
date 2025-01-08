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
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(QueryModel, query) {
        this.QueryModel = QueryModel;
        this.query = query;
    }
    search(searchField) {
        if (this.query.searchTerm) {
            this.QueryModel = this.QueryModel.find({
                $or: searchField.map((field) => ({
                    [field]: { $regex: this.query.searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    filter() {
        const excludeField = ["searchTerm", "sort", "limit", "page"];
        const objQuery = Object.assign({}, this.query);
        excludeField.forEach((el) => delete objQuery[el]);
        this.QueryModel = this.QueryModel.find(objQuery);
        return this;
    }
    sort() {
        const sortField = this.query.sort || "-createdAt";
        this.QueryModel = this.QueryModel.sort(sortField);
        return this;
    }
    pagination() {
        var _a, _b;
        const page = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (Number(page) - 1) * Number(limit);
        this.QueryModel = this.QueryModel.skip(Number(skip)).limit(Number(limit));
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const totalQueries = this.QueryModel.getFilter();
            const total = yield this.QueryModel.model.countDocuments(totalQueries);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
