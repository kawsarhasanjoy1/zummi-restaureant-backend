import { Router } from "express";
import { productController } from "./controller";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import { productSchema } from "./validation";
import { auth } from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const ProductRouter = Router();

ProductRouter.post(
  "/create-product",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  zodMiddleware(productSchema),
  productController.createProduct
);
ProductRouter.get("/get-products", productController.getProducts);
ProductRouter.get(
  "/get-product/:productId",
  // auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  productController.getProduct
);
ProductRouter.post(
  "/update-product/:productId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  productController.upProduct
);
ProductRouter.delete(
  "/delete-product/:productId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  productController.deleteProduct
);

export default ProductRouter;
