import { Request, Response, NextFunction } from "express";
import catchAsync from "../../../shared/utils/catchAsync";
import { activityServices } from "./services";
import sendResponse from "../../../shared/utils/sendResponse";
import { ActivityModel } from "./model";

// export const logActivity = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//   }
// );
const getActivity = catchAsync(async (req: Request, res: Response) => {
  const result = await activityServices.getActivity();
  sendResponse(res, {
    statusCode: 200,
    message: "fetch activity data successful",
    data: result,
  });
});

export const activityController = {
  getActivity,
};
