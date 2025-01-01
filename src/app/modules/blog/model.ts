import { model, Schema } from "mongoose";
import { TBlog } from "./interface";

const BlogSchema = new Schema<TBlog>(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = model<TBlog>("blog", BlogSchema);

export default BlogModel;
