import { Router } from "express";
import { activityController } from "./controller";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const activityRouter = Router();

activityRouter.get(
  "/recent-activities",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.chef, USER_ROLE.user),
  activityController.getActivity
);

export default activityRouter;
