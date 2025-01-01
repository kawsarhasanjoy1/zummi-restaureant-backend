import AppError from "../../middleWare/AppError";
import { TProduct } from "./interface";
import ProductModel from "./model";

const CreateProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};
const getProducts = async () => {
  const result = await ProductModel.find().populate("reviews");
  return result;
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
