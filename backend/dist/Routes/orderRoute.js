"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orderController_1 = require("../Controller/orderController");
const wrapper_1 = __importDefault(require("../Middlewear/wrapper"));
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.route("/").get((0, wrapper_1.default)(orderController_1.getOrders)).post((0, wrapper_1.default)(orderController_1.createOrder));
exports.orderRouter
    .route("/:id")
    .get((0, wrapper_1.default)(orderController_1.getOrder))
    .patch((0, wrapper_1.default)(orderController_1.patchOrder))
    .delete((0, wrapper_1.default)(orderController_1.deleteOrder));
