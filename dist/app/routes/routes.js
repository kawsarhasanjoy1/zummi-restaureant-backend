"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_1 = __importDefault(require("../modules/user/router"));
const route_1 = __importDefault(require("../modules/Auth/route"));
const router_2 = __importDefault(require("../modules/product/router"));
const route_2 = __importDefault(require("../modules/review/route"));
const router = (0, express_1.Router)();
const RouterPath = [
    {
        path: "/api/v1",
        route: router_1.default,
    },
    {
        path: "/api/v1",
        route: route_1.default,
    },
    {
        path: "/api/v1",
        route: router_2.default,
    },
    {
        path: "/api/v1",
        route: route_2.default,
    },
];
RouterPath.map((route) => router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
