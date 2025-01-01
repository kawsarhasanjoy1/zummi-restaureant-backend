import { Model, Types } from "mongoose";

export interface TReview {
  productId: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  review: string;
}

export interface TProductModel extends Model<TReview> {
  calcAverageRatings(productId: Types.ObjectId): Promise<void>;
}
