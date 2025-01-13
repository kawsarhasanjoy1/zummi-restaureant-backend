import mongoose, { Schema, Document, model } from 'mongoose';
import { TPayment } from './interfact';


const PaymentSchema = new Schema<TPayment>(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref:'product' },
    userId: { type: Schema.Types.ObjectId, required: true, ref:'user' },
    transactionId: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    district: { type: String, required: true },
    subdistrict: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);

export const paymentModel =  model<TPayment>('payment', PaymentSchema);
