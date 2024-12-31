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
const config_1 = __importDefault(require("../../config/config"));
const constance_1 = require("../constance/constance");
const model_1 = __importDefault(require("../modules/user/model"));
const superUser = {
    email: "kawsarhasanjoy342@gmail,com",
    name: 'Md Kawsar',
    password: config_1.default.super_admin_pass,
    role: constance_1.USER_ROLE.superAdmin,
    image: "https://i.ibb.co.com/WsrL60p/20240905-143900.jpg"
};
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    //when database is connected, we will check is there any user who is super admin
    const isSuperAdminExits = yield model_1.default.findOne({ role: constance_1.USER_ROLE.superAdmin });
    if (!isSuperAdminExits) {
        yield model_1.default.create(superUser);
    }
});
exports.default = seedSuperAdmin;
