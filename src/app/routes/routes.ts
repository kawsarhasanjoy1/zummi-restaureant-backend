import { Router } from "express";
import userRouter from "../modules/user/router";
import AuthRouter from "../modules/Auth/route";

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
];

RouterPath.map((route) => router.use(route?.path, route?.route));

export default router;
