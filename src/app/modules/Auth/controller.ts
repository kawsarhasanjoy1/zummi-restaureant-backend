import { Request, Response } from "express";
import { AuthService } from "./services";
import catchAsync from "../../../shared/utils/catchAsync";
import sendResponse from "../../../shared/utils/sendResponse";

const loginController = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await AuthService.loginServices(user);
  sendResponse(res, {
    statusCode: 200,
    message: "user login successful",
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const password = req.body;
  const user = req.user;
  const result = await AuthService.changePassword(user, password);
  sendResponse(res, {
    statusCode: 201,
    message: "password change successful",
    data: result,
  });
});
export const authController = {
  loginController,
  changePassword
};
