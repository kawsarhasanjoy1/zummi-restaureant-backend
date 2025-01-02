import { Query } from "mongoose";

class QueryBuilder<T> {
  public QueryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(QueryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.QueryModel = QueryModel;
    this.query = query;
  }

  search(searchField: string[]) {
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
    const objQuery = { ...this.query };
    excludeField.forEach((el) => delete objQuery[el]);
    this.QueryModel = this.QueryModel.find(objQuery);
    return this;
  }
  sort() {
    const sort = this?.query?.sort || "-createdAt";
    this.QueryModel = this.QueryModel.sort(sort as string);
    return this;
  }
  pagination() {
    const page = this?.query?.page || 1;
    const limit = this?.query?.limit || 10;
    const skip = (Number(page) - 1) * Number(limit);
    this.QueryModel = this.QueryModel.skip(Number(skip)).limit(Number(limit));
    return this;
  }
}

export default QueryBuilder;
