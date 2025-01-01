import { model, Schema } from "mongoose";
import TOrder, { TOrderUser } from "./interface";

const orderUserSchema = new Schema<TOrderUser>({
  email: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  city: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

const orderSchema = new Schema<TOrder>({
  paymentId: { type: String, required: true },
  userId: { type: Schema.ObjectId, required: true, ref: "user" },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  productId: { type: [Schema.ObjectId], required: true, ref: "product" },
  userInfo: orderUserSchema,
});

const OrderModel = model<TOrder>("order", orderSchema);

export default OrderModel;
