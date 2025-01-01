import { Router } from "express";
import userRouter from "../modules/user/router";
import AuthRouter from "../modules/Auth/route";
import ProductRouter from "../modules/product/router";
import ReviewRouter from "../modules/review/route";


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
];

RouterPath.map((route) => router.use(route?.path, route?.route));

export default router;
