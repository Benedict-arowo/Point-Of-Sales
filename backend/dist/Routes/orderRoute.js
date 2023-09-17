"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orderController_1 = require("../Controller/orderController");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.route("/").get(orderController_1.getOrders).post(orderController_1.createOrder);
exports.orderRouter.route("/:id").get(orderController_1.getOrder).patch(orderController_1.patchOrder).delete(orderController_1.deleteOrder);
