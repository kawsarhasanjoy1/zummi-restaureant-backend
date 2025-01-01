import { TReview } from "./interface";
import ReviewModel from "./model";

const createReview = async (payload: TReview) => {
  const result = await ReviewModel.create(payload);
  if (result) {
    await ReviewModel.calcAverageRatings(result.productId);
  }
  return result;
};
const getReviews = async () => {
  const result = await ReviewModel.find()
    .populate("productId")
    .populate("user");
  return result;
};

export const reviewServices = {
  createReview,
  getReviews,
};
