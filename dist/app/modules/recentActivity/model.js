"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModel = void 0;
const mongoose_1 = require("mongoose");
const ActivitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    path: { type: String, required: true },
}, { timestamps: true });
ActivitySchema.index({ userId: 1, path: 1 }, { unique: true });
exports.ActivityModel = (0, mongoose_1.model)("activity", ActivitySchema);
