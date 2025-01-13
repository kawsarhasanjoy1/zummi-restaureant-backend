import { Router } from "express";
import { authController } from "./controller";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import { TLoginUserSchema } from "./LoginUserSchema";
import  auth  from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const AuthRouter = Router();

AuthRouter.post(
  "/login",
  zodMiddleware(TLoginUserSchema),
  authController.loginController
);
AuthRouter.post(
  "/change-password",
  auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.chef),
  authController.changePassword
);

export default AuthRouter;
