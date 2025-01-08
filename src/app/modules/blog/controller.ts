import { Request, Response } from "express";
import AppError from "../../middleWare/AppError";
import { TBlog } from "./interface";
import BlogModel from "./model";
import { blogServices } from "./services";
import sendResponse from "../../../shared/utils/sendResponse";
import catchAsync from "../../../shared/utils/catchAsync";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = req.body;
  const result = await blogServices.createBlog(blog);
  sendResponse(res, {
    statusCode: 201,
    message: "blog created successful",
    data: result,
  });
});

const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogServices.getBlogs(req?.query);
  sendResponse(res, {
    statusCode: 200,
    message: "blog fetched successful",
    data: result,
  });
});
const getBlog = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.blogId;
  const result = await blogServices.getBlog(id);
  sendResponse(res, {
    statusCode: 200,
    message: "single blog fetch successful",
    data: result,
  });
});
const deleteBlog = async (req: Request, res: Response) => {
  const id = req.params.blogId;
  const result = await blogServices.deleteBlog(id);
  sendResponse(res, {
    statusCode: 200,
    message: "blog deleted successful",
    data: result,
  });
};

export const blogController = {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
};
