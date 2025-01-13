import { Request, Response } from "express";
import { orderServices } from "./services";
import sendResponse from "../../../shared/utils/sendResponse";

const getOrders = async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await orderServices.getOrders(query);
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
const getUserOrder = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const query = req.query;
  const result = await orderServices.getUserOrder({ id, query });
  sendResponse(res, {
    statusCode: 200,
    message: "user order fetched successful",
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
const getUserStats = async (req: Request, res: Response) => {
  const id = req?.params?.userId;
  const result = await orderServices.getUserStats(id);

  sendResponse(res, {
    statusCode: 200,
    message: "user stats get successful",
    data: result,
  });
};
const getChefStats = async (req: Request, res: Response) => {
  const result = await orderServices.getChefStats();
  sendResponse(res, {
    statusCode: 200,
    message: "chef stats get successful",
    data: result,
  });
};
const getAdminStats = async (req: Request, res: Response) => {
  const result = await orderServices.getAdminStats();

  sendResponse(res, {
    statusCode: 200,
    message: "admin stats get successful",
    data: result,
  });
};
const deleteUserOrder = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const result = await orderServices.deleteOrder(id);
  sendResponse(res, {
    statusCode: 200,
    message: "user order deleted successful",
    data: result,
  });
};

export const orderController = {
  getOrders,
  getOrder,
  deleteOrder,
  getUserOrder,
  deleteUserOrder,
  getAdminStats,
  getUserStats,
  getChefStats,
};
