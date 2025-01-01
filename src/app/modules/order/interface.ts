import { Schema } from "mongoose";

export interface TOrderUser {
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  city: string;
  contactNumber: string;
}

interface TOrder {
  paymentId: string;
  userId: Schema.Types.ObjectId;
  email: string;
  price: number;
  quantity: number;
  productId: Schema.Types.ObjectId[];
  userInfo: TOrderUser;
}


export default TOrder