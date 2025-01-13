import { Router } from "express";
import { blogController } from "./controller";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import { blogValidationSchema } from "./blogValidationSchema";
import  auth  from "../../middleWare/auth";
import { USER_ROLE } from "../../constance/constance";

const BlogRouter = Router();

BlogRouter.post(
  "/create-blog",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  zodMiddleware(blogValidationSchema),
  blogController.createBlog
);
BlogRouter.get("/get-blogs", blogController.getBlogs);
BlogRouter.get("/get-blog/:blogId", blogController.getBlog);
BlogRouter.delete(
  "/delete-blog/:blogId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  blogController.deleteBlog
);

export default BlogRouter;
