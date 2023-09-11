"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itemsRoute_1 = require("./itemsRoute");
const orderRoute_1 = require("./orderRoute");
exports.default = {
    itemRouter: itemsRoute_1.item,
    orderRouter: orderRoute_1.orderRouter,
};
