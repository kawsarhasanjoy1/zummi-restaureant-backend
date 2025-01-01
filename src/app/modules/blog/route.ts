import { Router } from "express";
import { blogController } from "./controller";
import zodMiddleware from "../../middleWare/zoodMiddleware";
import { blogValidationSchema } from "./blogValidationSchema";

const BlogRouter = Router();

BlogRouter.post(
  "/create-blog",
  zodMiddleware(blogValidationSchema),
  blogController.createBlog
);
BlogRouter.get("/get-blogs", blogController.getBlogs);
BlogRouter.get("/get-blog/:blogId", blogController.getBlog);
BlogRouter.delete("/delete-blog/:blogId", blogController.deleteBlog);

export default BlogRouter;
