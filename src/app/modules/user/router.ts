import { Router } from "express";
import { userController } from "./controller"; // Adjust based on your actual path
import UserZodValidation from "./zod-validation"; // Adjust based on your actual path
import zodMiddleware from "../../middleWare/zoodMiddleware";

const userRouter = Router();

userRouter.post(
  "/create-user",
  zodMiddleware(UserZodValidation),
  userController.createUser
); // Apply validation middleware
userRouter.get("/all-user", userController.getAllUser);
userRouter.get("/get-single-user/:userId", userController.getSingleUser);
userRouter.get("/delete-user/:userId", userController.deleteUser);

export default userRouter;
