import { Types } from "mongoose";


interface Product {
  productId: Types.ObjectId;
  quantity: number;
}

export interface TOrder {
  products: Product[];
  userId: Types.ObjectId;
  email: string;
  quantity: number;
  price: number;
  name: string;
  number: string;
  district: string;
  subdistrict: string;
  transactionId: string,
  status: boolean
}