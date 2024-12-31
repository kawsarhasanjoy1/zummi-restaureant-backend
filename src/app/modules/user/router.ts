import { Router } from "express";
import { userController } from "./controller"; // Adjust based on your actual path
import UserZodValidation from "./zod-validation"; // Adjust based on your actual path
import zodMiddleware from "../../middleWare/zoodMiddleware";
import { auth } from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const userRouter = Router();

userRouter.post(
  "/create-user",
  zodMiddleware(UserZodValidation),
  userController.createUser
); // Apply validation middleware
userRouter.get("/all-user", auth(USER_ROLE.admin), userController.getAllUser);
userRouter.get("/get-single-user/:userId", userController.getSingleUser);
userRouter.get("/delete-user/:userId", userController.deleteUser);

export default userRouter;
