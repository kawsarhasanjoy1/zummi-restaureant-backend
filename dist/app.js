"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes/routes"));
const notFound_1 = __importDefault(require("./app/middleWare/notFound"));
const globalErrorHandler_1 = require("./app/middleWare/globalErrorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(routes_1.default);
app.use(notFound_1.default);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
