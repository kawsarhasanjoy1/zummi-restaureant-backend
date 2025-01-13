import { Types } from "mongoose";

export interface TActivity {
  userId: Types.ObjectId;
  ipAddress: string;
  userAgent: string;
  path: string;
  updatedAt: Date; 
  createdAt: Date; 
}