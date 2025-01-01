import AppError from "../../middleWare/AppError";
import { TBlog } from "./interface";
import BlogModel from "./model";

const createBlog = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};

const getBlogs = async () => {
  const result = await BlogModel.find();
  return result;
};
const getBlog = async (id: string) => {
  const result = await BlogModel.findById({ id });
  if (!result) {
    throw new AppError(404, 'Product dose not exist')
  }
  return result;
};
const deleteBlog = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404,'Product dose not exist')
  }
};

export const blogServices = {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
};
