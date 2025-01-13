import { Router } from "express";
import { chefController } from "./controller";
import  auth  from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const chefRouter = Router()

chefRouter.get('/get-chefs', chefController.getChefs)
chefRouter.get('/get-chef/:chefId', chefController.getChef)
chefRouter.delete('/delete-chef/:chefId',auth(USER_ROLE.admin,USER_ROLE.superAdmin), chefController.deleteChef)
chefRouter.put('/up-chef/:chefId',auth(USER_ROLE.admin,USER_ROLE.superAdmin), chefController.upChef)


export default chefRouter