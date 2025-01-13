import QueryBuilder from "../../Builder/QueryBuilder";
import { TReview } from "./interface";
import ReviewModel from "./model";

const createReview = async (payload: TReview) => {
  const result = await ReviewModel.create(payload);
  if (result) {
    await ReviewModel.calcAverageRatings(result.productId);
  }
  return result;
};
const getReviews = async (query: Record<string, any>) => {
  const searchTerm = ["rating"];
  const searchQuery = new QueryBuilder(ReviewModel.find(), query)
    .search(searchTerm)
    .filter()
    .sort()
    .pagination();
  const countTotal = await searchQuery.countTotal();
  const result = await searchQuery.QueryModel.populate("productId").populate(
    "user"
  );

  return {
    countTotal,
    result,
  };
};
const getUserReviews = async ({ id, query }: any) => {
  const searchTerm = ["rating"];
  const searchQuery = new QueryBuilder(ReviewModel.find({ user: id }), query)
    .search(searchTerm)
    .filter()
    .sort()
    .pagination();
  const countTotal = await searchQuery.countTotal();
  const result = await searchQuery.QueryModel.populate("productId").populate(
    "user"
  );

  return {
    countTotal,
    result,
  };
};

const deleteReview = async (id: string) => {
  const result = await ReviewModel.findByIdAndDelete(id);
  return result;
};

export const reviewServices = {
  createReview,
  getReviews,
  getUserReviews,
  deleteReview,
};
