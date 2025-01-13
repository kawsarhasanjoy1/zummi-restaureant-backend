import { model, Schema } from "mongoose";
import { TOrder } from "./interface";

const orderSchema = new Schema<TOrder>(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    userId: {
      type:Schema.Types.ObjectId,
      ref:'user',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    subdistrict: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const orderModel = model<TOrder>("order", orderSchema);
