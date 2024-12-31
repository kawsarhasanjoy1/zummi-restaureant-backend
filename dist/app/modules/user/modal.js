"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPass: { type: String, required: true },
    image: { type: String, required: true },
});
const UserModel = (0, mongoose_1.model)("user", userSchema);
