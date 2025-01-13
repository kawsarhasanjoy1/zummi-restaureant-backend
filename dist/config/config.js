"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    base_url: process.env.BASE_URL,
    mongoose_url: process.env.MONGOOSE_URL,
    super_admin_pass: process.env.SUPER_ADMIN_PASS,
    bcrypt: process.env.BCRYPT,
    access_token: process.env.ACCESS_TOKEN,
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASS,
};
