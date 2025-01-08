import { Types } from "mongoose";

export type Ingredient = {
  name: string;
  quantity: string;
};

export type AdditionalInfo = {
  calories: number;
  protein: string;
  totalFat: string;
  size: string;
};

export type TProduct = {
  name: string;
  title: string;
  stock: number;
  category: string;
  userId: Types.ObjectId;
  price: number;
  priceOff: number;
  ingredients: Ingredient[];
  description: string;
  image: string;
  additionalInfo: AdditionalInfo;
  ratingAverage: number;
  ratingQuantity: number;
};
