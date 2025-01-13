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
const QueryBuilder_1 = __importDefault(require("../../Builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../middleWare/AppError"));
const model_1 = __importDefault(require("../chef/model"));
const model_2 = __importDefault(require("./model"));
const createChef = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield model_2.default.startSession();
    session.startTransaction();
    try {
        const user = {};
        const role = "chef";
        user.password = (payload === null || payload === void 0 ? void 0 : payload.password) || "zummi123";
        user.role = role;
        user.email = payload.email;
        user.name = payload.name;
        user.image = payload.image;
        const NewUser = yield model_2.default.create([user], { session });
        if (NewUser.length > 0) {
            payload.userId = NewUser[0]._id;
            // সেফ ক্রিয়েট করা
            const newChef = yield model_1.default.create([payload], { session });
            yield session.commitTransaction();
            session.endSession();
            return newChef;
        }
        else {
            throw new Error("User creation failed");
        }
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error(`Transaction failed: ${error.message}`);
    }
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.create(payload);
    return result;
});
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = ["name", "email", "role"];
    const userQuery = new QueryBuilder_1.default(model_2.default.find(), query)
        .search(searchTerm)
        .filter()
        .pagination()
        .sort();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.QueryModel;
    return {
        result,
        meta,
    };
});
const fetchAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const admin = "admin";
    const result = yield model_2.default.find({ role: admin });
    return result;
});
const fetchAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.find();
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.findById(id);
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_2.default.findOne({ _id: id });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    const chef = yield model_1.default.findOne({ userId: user === null || user === void 0 ? void 0 : user._id });
    if (chef) {
        yield model_1.default.findByIdAndDelete(chef === null || chef === void 0 ? void 0 : chef._id);
        yield model_2.default.findByIdAndDelete(user === null || user === void 0 ? void 0 : user._id);
    }
    const result = yield model_2.default.findByIdAndDelete(user === null || user === void 0 ? void 0 : user._id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_2.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const updateRole = (id, role, currentAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_2.default.findOne({ _id: id });
    const userId = user === null || user === void 0 ? void 0 : user._id;
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    if (userId == (currentAdmin === null || currentAdmin === void 0 ? void 0 : currentAdmin.id)) {
        throw new AppError_1.default(403, "You cannot update your own role");
    }
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
    fetchAllUser,
    fetchAdmin,
};
