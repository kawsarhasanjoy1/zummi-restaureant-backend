import { Router } from "express";
import { paymentController } from "./controller";
import { USER_ROLE } from "../../constance/constance";
import auth from "../../middleWare/auth";

const paymentRouter = Router();

paymentRouter.post("/create-payment-order", paymentController.createPayment);
paymentRouter.post("/payment/success/:tranId", paymentController.updateStatus);
paymentRouter.post("/payment/fail/:tranId", paymentController.failedPayment);
paymentRouter.get(
  "/get-payments",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin,USER_ROLE.chef),
  paymentController.getPayments
);

paymentRouter.get(
  "/get-payment/:userId",
  auth(USER_ROLE.user),
  paymentController.getPayments
);

export default paymentRouter;
