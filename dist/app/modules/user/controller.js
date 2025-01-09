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
exports.userController = void 0;
const services_1 = require("./services");
const catchAsync_1 = __importDefault(require("../../../shared/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const createChef = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chef = req.body;
    const result = services_1.userServices.createChef(chef);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "Chef created successful",
        data: result,
    });
}));
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    console.log(user);
    const result = yield services_1.userServices.createUser(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: "User created successful",
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.userServices.getAllUser(req === null || req === void 0 ? void 0 : req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "user faced successful",
        data: result,
    });
}));
const fetchAllUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.userServices.fetchAllUser();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "user faced successful",
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const result = yield services_1.userServices.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "single user faced successful",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const result = yield services_1.userServices.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User deleted successful",
        data: result,
    });
}));
const UpdateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const user = req.body;
    const result = yield services_1.userServices.updateUser(id, user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "User update successful",
        data: result,
    });
}));
const UpdateRole = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const { role } = req.body;
    const result = yield services_1.userServices.updateRole(id, role);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Role update successful",
        data: result,
    });
}));
exports.userController = {
    createChef,
    createUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    UpdateUser,
    UpdateRole,
    fetchAllUser
};
