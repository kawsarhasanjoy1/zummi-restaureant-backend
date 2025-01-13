import { Router } from "express";
import { orderController } from "./controller";
import  auth  from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const OrderRouter = Router();

OrderRouter.get(
  "/get-orders",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.chef),
  orderController.getOrders
);
OrderRouter.get("/get-order/:orderId", orderController.getOrder);
OrderRouter.get(
  "/get-user-order/:userId",
  auth(USER_ROLE.user),
  orderController.getUserOrder
);
OrderRouter.delete(
  "/delete-user-order/:userId",
  auth(USER_ROLE.user),
  orderController.deleteUserOrder
);
OrderRouter.get(
  "/get-admin-stats",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  orderController.getAdminStats
);
OrderRouter.delete(
  "/delete-order/:orderId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  orderController.deleteOrder
);

export default OrderRouter;
