import QueryBuilder from "../../Builder/QueryBuilder";
import AppError from "../../middleWare/AppError";
import { TProduct } from "./interface";
import ProductModel from "./model";

const CreateProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};
const getProducts = async (query: Record<string, unknown>) => {
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

  const productQuery = new QueryBuilder(ProductModel.find(), query)
    .search(searchField)
    .filter()
    .sort()
    .pagination();
  const meta = await productQuery.countTotal();
  const result = await productQuery.QueryModel.populate("userId");
  return {
    result,
    meta,
  };
};
const getProduct = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};
const upProduct = async (id: string, payload: Partial<TProduct>) => {
  const isExistId = ProductModel.findOne({ _id: id });
  if (!isExistId) {
    throw new AppError(404, "This product is not exist");
  }
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const DeleteProduct = async (id: string) => {
  const isExistId = ProductModel.findOne({ _id: id });
  if (!isExistId) {
    throw new AppError(404, "This product is not exist");
  }
  const result = await ProductModel.findByIdAndDelete(id, { new: true });
  return result;
};

export const productServices = {
  CreateProduct,
  getProducts,
  getProduct,
  upProduct,
  DeleteProduct,
};
