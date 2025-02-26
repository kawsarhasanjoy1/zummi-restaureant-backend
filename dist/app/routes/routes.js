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
const route_3 = __importDefault(require("../modules/blog/route"));
const route_4 = __importDefault(require("../modules/order/route"));
const route_5 = __importDefault(require("../modules/chef/route"));
const route_6 = __importDefault(require("../modules/payment/route"));
const router_3 = __importDefault(require("../modules/recentActivity/router"));
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
    {
        path: "/api/v1",
        route: route_3.default,
    },
    {
        path: "/api/v1",
        route: route_4.default,
    },
    {
        path: "/api/v1",
        route: route_5.default,
    },
    {
        path: "/api/v1",
        route: route_6.default,
    },
    {
        path: "/api/v1",
        route: router_3.default,
    },
];
RouterPath.map((route) => router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
