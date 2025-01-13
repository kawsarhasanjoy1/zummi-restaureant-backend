"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    products: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
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
}, { timestamps: true });
exports.orderModel = (0, mongoose_1.model)("order", orderSchema);
