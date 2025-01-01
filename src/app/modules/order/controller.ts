import { Request, Response } from "express";
import { orderServices } from "./services";
import sendResponse from "../../../shared/utils/sendResponse";

const createOrder = async (req: Request, res: Response) => {
  const order = req.body;
  const result = await orderServices.createOrder(order);
  sendResponse(res, {
    statusCode: 201,
    message: "Order successful",
    data: result,
  });
};
const getOrders = async (req: Request, res: Response) => {
  const result = await orderServices.getOrders();
  sendResponse(res, {
    statusCode: 200,
    message: " order fetched successful",
    data: result,
  });
};
const getOrder = async (req: Request, res: Response) => {
  const id = req.params.orderId;
  const result = await orderServices.getOrder(id);
  sendResponse(res, {
    statusCode: 200,
    message: "single order fetched successful",
    data: result,
  });
};

const deleteOrder = async (req: Request, res: Response) => {
  const id = req.params.orderId;
  const result = await orderServices.deleteOrder(id);
  sendResponse(res, {
    statusCode: 200,
    message: "order deleted successful",
    data: result,
  });
};

export const orderController = {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
};
