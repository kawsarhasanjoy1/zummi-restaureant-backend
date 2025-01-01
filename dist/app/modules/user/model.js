"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constance_1 = require("../../constance/constance");
const config_1 = __importDefault(require("../../../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [
            constance_1.USER_ROLE.user,
            constance_1.USER_ROLE.chef,
            constance_1.USER_ROLE.admin,
            constance_1.USER_ROLE.superAdmin,
        ],
        default: "user",
        required: true,
    },
    image: { type: String, required: true },
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // doc
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt));
        next();
    });
});
const UserModel = (0, mongoose_1.model)("user", userSchema);
exports.default = UserModel;
