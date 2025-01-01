import { Router } from "express";
import { reviewController } from "./controller";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import TReviewValidationSchema from "./reviewValidation";

const ReviewRouter = Router();

ReviewRouter.post(
  "/create-review",
  zodMiddleware(TReviewValidationSchema),
  reviewController.createReview
);
ReviewRouter.get("/get-reviews", reviewController.getReviews);

export default ReviewRouter;
