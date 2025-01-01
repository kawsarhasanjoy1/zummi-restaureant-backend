"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderUserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    city: { type: String, required: true },
    contactNumber: { type: String, required: true },
});
const orderSchema = new mongoose_1.Schema({
    paymentId: { type: String, required: true },
    userId: { type: mongoose_1.Schema.ObjectId, required: true, ref: "user" },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    productId: { type: [mongoose_1.Schema.ObjectId], required: true, ref: "product" },
    userInfo: orderUserSchema,
});
const OrderModel = (0, mongoose_1.model)("order", orderSchema);
exports.default = OrderModel;
