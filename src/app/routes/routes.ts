import { Router } from "express";
import userRouter from "../modules/user/router";
import AuthRouter from "../modules/Auth/route";
import ProductRouter from "../modules/product/router";
import ReviewRouter from "../modules/review/route";
import BlogRouter from "../modules/blog/route";
import OrderRouter from "../modules/order/route";
import chefRouter from "../modules/chef/route";

const router = Router();

const RouterPath = [
  {
    path: "/api/v1",
    route: userRouter,
  },
  {
    path: "/api/v1",
    route: AuthRouter,
  },
  {
    path: "/api/v1",
    route: ProductRouter,
  },
  {
    path: "/api/v1",
    route: ReviewRouter,
  },
  {
    path: "/api/v1",
    route: BlogRouter,
  },
  {
    path: "/api/v1",
    route: OrderRouter,
  },
  {
    path: "/api/v1",
    route: chefRouter,
  },
];

RouterPath.map((route) => router.use(route?.path, route?.route));

export default router;
