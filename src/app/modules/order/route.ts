import { Router } from "express";
import { orderController } from "./controller";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import OrderValidationSchema from "./orderValidationSchema";

const OrderRouter = Router();

OrderRouter.post(
  "/create-order",
  zodMiddleware(OrderValidationSchema),
  orderController.createOrder
);
OrderRouter.get("/get-orders", orderController.getOrders);
OrderRouter.get("/get-order/:orderId", orderController.getOrder);
OrderRouter.delete("/delete-order/:orderId", orderController.deleteOrder);

export default OrderRouter;
