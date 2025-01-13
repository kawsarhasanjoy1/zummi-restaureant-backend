import { Schema, model } from "mongoose";
import { TActivity } from "./interface";

const ActivitySchema = new Schema<TActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true }, 
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    path: { type: String, required: true },
  },
  { timestamps: true }
);

ActivitySchema.index({ userId: 1, path: 1 }, { unique: true });

export const ActivityModel = model<TActivity>("activity", ActivitySchema);
