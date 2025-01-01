import { Router } from "express";
import { chefController } from "./controller";

const chefRouter = Router()

chefRouter.get('/get-chefs', chefController.getChefs)
chefRouter.get('/get-chef/:chefId', chefController.getChef)
chefRouter.delete('/delete-chef/:chefId', chefController.deleteChef)
chefRouter.put('/up-chef/:chefId', chefController.upChef)


export default chefRouter