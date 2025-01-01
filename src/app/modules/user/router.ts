import { Router } from "express";
import { userController } from "./controller";
import UserZodValidation from "./zod-validation";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import { auth } from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const userRouter = Router();

userRouter.post(
  "/create-user",
  zodMiddleware(UserZodValidation),
  userController.createUser
);
userRouter.get(
  "/all-user",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  userController.getAllUser
);
userRouter.get("/get-single-user/:userId", userController.getSingleUser);
userRouter.get(
  "/delete-user/:userId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  userController.deleteUser
);
userRouter.post(
  "/update-user/:userId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  userController.UpdateUser
);
userRouter.post(
  "/update-role/:userId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  userController.UpdateRole
);

export default userRouter;
