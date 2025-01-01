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
exports.chefController = void 0;
const services_1 = require("./services");
const catchAsync_1 = __importDefault(require("../../../shared/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/utils/sendResponse"));
const getChefs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_1.chefServices.getChefs();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "Chef fetched successful",
        data: result,
    });
}));
const getChef = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.chefId;
    const result = yield services_1.chefServices.getChef(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: "single chef fetched successful",
        data: result,
    });
}));
const deleteChef = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.chefId;
    const result = yield services_1.chefServices.deleteChef(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: " chef deleted successful",
        data: result,
    });
}));
const upChef = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.chefId;
    const chef = req.body;
    const result = yield services_1.chefServices.upChef(id, chef);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: " chef updated successful",
        data: result,
    });
}));
exports.chefController = {
    getChefs,
    getChef,
    deleteChef,
    upChef,
};
