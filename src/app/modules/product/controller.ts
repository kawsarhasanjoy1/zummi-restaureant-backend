import { Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchAsync";
import sendResponse from "../../../shared/utils/sendResponse";
import { productServices } from "./service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = req.body;
  const result = await productServices.CreateProduct(product);
  sendResponse(res, {
    statusCode: 201,
    message: "Product created successful",
    data: result,
  });
});
const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.getProducts();
  sendResponse(res, {
    statusCode: 200,
    message: "Product fetched successful",
    data: result,
  });
});
const getProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;
  const result = await productServices.getProduct(id);
  sendResponse(res, {
    statusCode: 200,
    message: "single product fetched successful",
    data: result,
  });
});
const upProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;
  const up = req.body;
  const result = await productServices.upProduct(id, up);
  sendResponse(res, {
    statusCode: 200,
    message: " product update fetched successful",
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.productId;
  const result = await productServices.DeleteProduct(id);
  sendResponse(res, {
    statusCode: 200,
    message: " product delete successful",
    data: result,
  });
});

export const productController = {
  createProduct,
  getProducts,
  getProduct,
  upProduct,
  deleteProduct,
};
