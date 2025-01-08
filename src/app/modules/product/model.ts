import { model, Schema } from "mongoose";
import { AdditionalInfo, Ingredient, TProduct } from "./interface";

const ingredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

const additionalInfoSchema = new Schema<AdditionalInfo>({
  calories: { type: Number, required: true },
  protein: { type: String, required: true },
  totalFat: { type: String, required: true },
  size: { type: String, required: true },
});

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    priceOff: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    stock: { type: Number, default: 0 },
    ingredients: [ingredientSchema],
    description: { type: String, required: true },
    image: { type: String, required: true },
    additionalInfo: additionalInfoSchema,
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

productSchema.virtual("reviews", {
  ref: "review",
  foreignField: "productId",
  localField: "_id",
});

const ProductModel = model<TProduct>("product", productSchema);

export default ProductModel;
