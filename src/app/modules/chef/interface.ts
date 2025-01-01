import { Types } from "mongoose";

export interface TChef {
  name: string;
  userId: Types.ObjectId
  email: string;
  title: string;
  experience: number;
  contactNumber: string;
  description: string;
  image: string;
  password?: string;
}
