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
exports.userServices = void 0;
const model_1 = __importDefault(require("../chef/model"));
const model_2 = __importDefault(require("./model"));
const createChef = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {};
    const role = "chef";
    (user.password = (payload === null || payload === void 0 ? void 0 : payload.password) || "zummi123"), (user.role = role);
    (user.email = payload.email),
        (user.name = payload.name),
        (user.image = payload.image);
    const NewUser = yield model_2.default.create(user);
    if (Object.keys(NewUser).length > 0) {
        payload.userId = NewUser._id;
        const newChef = yield model_1.default.create(payload);
        return newChef;
    }
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.create(payload);
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.findById(id);
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.findByIdAndDelete(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const updateRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.findOneAndUpdate({ _id: id }, { role: role }, { new: true });
    return result;
});
exports.userServices = {
    createChef,
    createUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    updateRole,
};
