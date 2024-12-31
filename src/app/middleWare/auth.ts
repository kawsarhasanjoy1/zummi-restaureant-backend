import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import UserModel from "../modules/user/model";
import { USER_ROLE } from "../constance/constance";
import AppError from "./AppError";
type TUserRole = keyof typeof USER_ROLE;
export const auth = (...Role: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "Unauthorize user");
    }
    const decoded = jwt.verify(
      token,
      config.access_token as string
    ) as JwtPayload;
    const { role, name, email, id, iat } = decoded as JwtPayload;
    const existId = await UserModel.findById({ _id: id });
    const existEmail = await UserModel.findOne({ email });
    if (!existId) {
      throw new AppError(401, "Unauthorize user");
    }
    if (!existEmail) {
      throw new AppError(401, "Unauthorized user please check your email");
    }
    if (Role && !Role.includes(role)) {
      throw new AppError(401, "Unauthorized user");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
