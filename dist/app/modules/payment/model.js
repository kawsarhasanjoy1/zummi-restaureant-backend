"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModel = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'product' },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'user' },
    transactionId: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    district: { type: String, required: true },
    subdistrict: { type: String, required: true },
}, {
    timestamps: true,
});
exports.paymentModel = (0, mongoose_1.model)('payment', PaymentSchema);
