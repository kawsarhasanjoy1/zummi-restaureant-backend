import { Router } from "express";
import { authController } from "./controller";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import { TLoginUserSchema } from "./LoginUserSchema";

const AuthRouter = Router();

AuthRouter.post(
  "/login",
  zodMiddleware(TLoginUserSchema),
  authController.loginController
);

export default AuthRouter