"use strict";
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
        var _a;
        const sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || "-createdAt";
        this.QueryModel = this.QueryModel.sort(sort);
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
}
exports.default = QueryBuilder;
