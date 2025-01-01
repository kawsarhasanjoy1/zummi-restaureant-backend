"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ingredientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
});
const additionalInfoSchema = new mongoose_1.Schema({
    calories: { type: Number, required: true },
    protein: { type: String, required: true },
    totalFat: { type: String, required: true },
    size: { type: String, required: true },
});
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    priceOff: { type: Number, default: 0 },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
productSchema.virtual("reviews", {
    ref: "review",
    foreignField: "productId",
    localField: "_id",
});
const ProductModel = (0, mongoose_1.model)("product", productSchema);
exports.default = ProductModel;
