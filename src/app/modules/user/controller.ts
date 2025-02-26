import { NextFunction, Request, Response } from "express";
import { userServices } from "./services";
import catchAsync from "../../../shared/utils/catchAsync";
import sendResponse from "../../../shared/utils/sendResponse";

const createChef = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const chef = req.body;
    const result = userServices.createChef(chef);
    sendResponse(res, {
      statusCode: 201,
      message: "Chef created successful",
      data: result,
    });
  }
);
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
    const result = await userServices.getAllUser(req?.query);
    sendResponse(res, {
      statusCode: 200,
      message: "user faced successful",
      data: result,
    });
  }
);
const fetchAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.fetchAllUser();
    sendResponse(res, {
      statusCode: 200,
      message: "user faced successful",
      data: result,
    });
  }
);
const fetchAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.fetchAdmin();
    sendResponse(res, {
      statusCode: 200,
      message: "admin faced successful",
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
const UpdateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId;
    const user = req.body;
    const result = await userServices.updateUser(id, user);
    sendResponse(res, {
      statusCode: 200,
      message: "User update successful",
      data: result,
    });
  }
);
const UpdateRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const currentAdmin = req?.user
    const id = req.params.userId;
    const { role } = req.body;

    const result = await userServices.updateRole(id, role, currentAdmin);
    sendResponse(res, {
      statusCode: 200,
      message: "Role update successful",
      data: result,
    });
  }
);

export const userController = {
  createChef,
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  UpdateUser,
  UpdateRole,
  fetchAllUser,
  fetchAdmin
};
