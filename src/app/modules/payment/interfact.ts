import { Types } from "mongoose";

export interface TPayment {
  productId: Types.ObjectId;
  userId: Types.ObjectId
  transactionId: string;
  quantity: number;
  price: number;
  name: string;
  number: string;
  district: string;
  subdistrict: string;
}
