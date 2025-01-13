import { Router } from "express";
import { reviewController } from "./controller";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import TReviewValidationSchema from "./reviewValidation";
import  auth  from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const ReviewRouter = Router();

ReviewRouter.post(
  "/create-review",
  zodMiddleware(TReviewValidationSchema),
  reviewController.createReview
);
ReviewRouter.get("/get-reviews", reviewController.getReviews);
ReviewRouter.get("/get-review/:userId", reviewController.getUserReview);
ReviewRouter.delete(
  "/delete-review/:reviewId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  reviewController.deleteReviews
);

export default ReviewRouter;
