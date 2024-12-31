import { NextFunction, Request, Response } from "express";
import { userServices } from "./services";
import catchAsync from "../../../shared/utils/catchAsync";
import sendResponse from "../../../shared/utils/sendResponse";
import { AppError } from "../../middleWare/AppError";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await userServices.createUser(user);
    sendResponse(res, {
      statusCode: 201,
      message: "User created successful",
      data: result,
    });
  }
);
const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUser();
    sendResponse(res, {
      statusCode: 200,
      message: "user faced successful",
      data: result,
    });
  }
);
const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId;

    const result = await userServices.getSingleUser(id);

    sendResponse(res, {
      statusCode: 200,
      message: "single user faced successful",
      data: result,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId;
    const result = await userServices.deleteUser(id);
    sendResponse(res, {
      statusCode: 200,
      message: "User deleted successful",
      data: result,
    });
  }
);

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser
};