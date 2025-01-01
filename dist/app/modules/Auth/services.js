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
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = __importDefault(require("../user/model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config/config"));
const AppError_1 = __importDefault(require("../../middleWare/AppError"));
const loginServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield model_1.default.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, "User dose not exist");
    }
    const hashPassword = user === null || user === void 0 ? void 0 : user.password;
    const match = yield bcrypt_1.default.compare(password, hashPassword);
    if (!match) {
        throw new AppError_1.default(403, "Password did not match");
    }
    const userPayload = {
        id: user === null || user === void 0 ? void 0 : user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const token = jsonwebtoken_1.default.sign(userPayload, config_1.default.access_token, {
        expiresIn: "1h",
    });
    return {
        user: userPayload,
        token,
    };
});
const changePassword = (user, Password) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistsId = yield model_1.default.findById(user === null || user === void 0 ? void 0 : user.id);
    if (!isExistsId) {
        throw new Error("User dose not exist");
    }
    const role = user === null || user === void 0 ? void 0 : user.role;
    const dbRole = isExistsId === null || isExistsId === void 0 ? void 0 : isExistsId.role;
    if (role !== dbRole) {
        throw new Error("don't match role");
    }
    const isExistPassword = isExistsId === null || isExistsId === void 0 ? void 0 : isExistsId.password;
    const passwordCompare = yield bcrypt_1.default.compare(Password === null || Password === void 0 ? void 0 : Password.oldPassword, isExistPassword);
    if (!passwordCompare) {
        throw new Error("didn't match password");
    }
    const password = Password === null || Password === void 0 ? void 0 : Password.newPassword;
    if (password == (Password === null || Password === void 0 ? void 0 : Password.oldPassword)) {
        throw new Error("Password change failed. Ensure the new password is unique and not among");
    }
    const newHashPass = yield bcrypt_1.default.hash(password, Number(10));
    const result = yield model_1.default.findByIdAndUpdate({ _id: user === null || user === void 0 ? void 0 : user.id }, { password: newHashPass });
    const data = {
        _id: user === null || user === void 0 ? void 0 : user.id,
        username: isExistsId === null || isExistsId === void 0 ? void 0 : isExistsId.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return data;
});
exports.AuthService = {
    loginServices,
    changePassword
};
