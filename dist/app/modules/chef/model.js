"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chefSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user" },
    title: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    experience: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    password: { type: String, default: "zummi123" },
}, { timestamps: true });
chefSchema.index({ email: 1, contactNumber: 1, userId: 1 });
const chefModel = (0, mongoose_1.model)("chef", chefSchema);
exports.default = chefModel;
