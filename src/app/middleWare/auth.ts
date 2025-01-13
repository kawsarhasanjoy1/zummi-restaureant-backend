import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import UserModel from "../modules/user/model";
import { USER_ROLE } from "../constance/constance";
import AppError from "./AppError";
import { ActivityModel } from "../modules/recentActivity/model";

type TUserRole = keyof typeof USER_ROLE;

const auth = (...Role: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "Unauthorize user");
    }
    const decoded = jwt.verify(
      token,
      config.access_token as string
    ) as JwtPayload;
    const { role, name, email, id } = decoded;

    const existId = await UserModel.findById(id);
    if (!existId) {
      throw new AppError(401, "Unauthorized user");
    }

    if (Role.length && !Role.includes(role as TUserRole)) {
      throw new AppError(401, "Unauthorized user role");
    }

    req.user = decoded;

    ("create activity user for last active user");

    const userId = req.user?.id;
    if (!userId) {
      console.warn("User ID is missing in the request.");
      return next();
    }
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"] || "unknown";
    const path = req.originalUrl;
    const activityData: {
      userId: string;
      ipAddress: string | undefined;
      userAgent: string;
      path: string;
    } = {
      userId: "",
      ipAddress: "",
      userAgent: "",
      path: "",
    };
    activityData["userId"] = userId;
    activityData["ipAddress"] = ipAddress;
    (activityData["path"] = path), (activityData["userAgent"] = userAgent);

    const isExistData = await ActivityModel.findOne({
      userId: activityData?.userId,
    });
    if (!isExistData) {
      const result = await ActivityModel.create(activityData);
      return result;
    } else {
      const result = await ActivityModel.findOneAndUpdate(
        { userId: isExistData?.userId }, // Match by userId field
        { $set: { updatedAt: new Date() } }, // Update the updatedAt field
        { new: true } // Return the updated document
      );
    }
    next();
  });
};

export default auth;
