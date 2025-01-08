import { Request, Response } from "express";
import { chefServices } from "./services";
import catchAsync from "../../../shared/utils/catchAsync";
import sendResponse from "../../../shared/utils/sendResponse";

const getChefs = catchAsync(async (req: Request, res: Response) => {
  const result = await chefServices.getChefs(req?.query);
  sendResponse(res, {
    statusCode: 200,
    message: "Chef fetched successful",
    data: result,
  });
});
const getChef = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.chefId;
  const result = await chefServices.getChef(id);
  sendResponse(res, {
    statusCode: 200,
    message: "single chef fetched successful",
    data: result,
  });
});
const deleteChef = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.chefId;
  const result = await chefServices.deleteChef(id);
  sendResponse(res, {
    statusCode: 200,
    message: " chef deleted successful",
    data: result,
  });
});
const upChef = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.chefId;
  const chef = req.body;
  const result = await chefServices.upChef(id, chef);
  sendResponse(res, {
    statusCode: 200,
    message: " chef updated successful",
    data: result,
  });
});

export const chefController = {
  getChefs,
  getChef,
  deleteChef,
  upChef,
};
