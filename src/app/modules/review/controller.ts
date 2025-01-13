import { Request, Response } from "express";
import catchAsync from "../../../shared/utils/catchAsync";
import { reviewServices } from "./services";
import sendResponse from "../../../shared/utils/sendResponse";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = req.body;
  const result = await reviewServices.createReview(review);
  sendResponse(res, {
    statusCode: 201,
    message: "review created successful",
    data: result,
  });
});
const getReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewServices.getReviews(req.query);
  sendResponse(res, {
    statusCode: 200,
    message: "review fetched successful",
    data: result,
  });
});
const getUserReview = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const id = req.params.userId
  const result = await reviewServices.getUserReviews({id,query});
  sendResponse(res, {
    statusCode: 200,
    message: "review fetched successful",
    data: result,
  });
});
const deleteReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewServices.deleteReview(req?.params?.reviewId);
  sendResponse(res, {
    statusCode: 200,
    message: "review deleted successful",
    data: result,
  });
});

export const reviewController = {
  createReview,
  getReviews,
  getUserReview,
  deleteReviews
};
