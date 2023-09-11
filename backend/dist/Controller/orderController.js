"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.patchOrder = exports.getOrder = exports.addOrder = exports.getOrders = void 0;
const getOrders = (req, res) => {
    return res.json({ data: "GET Orders" }).status(200);
};
exports.getOrders = getOrders;
const addOrder = (req, res) => {
    return res.json({ data: "POST Orders" }).status(201);
};
exports.addOrder = addOrder;
const getOrder = (req, res) => {
    return res.json({ data: "GET Order" }).status(201);
};
exports.getOrder = getOrder;
const patchOrder = (req, res) => {
    return res.json({ data: "PATCH Order" }).status(201);
};
exports.patchOrder = patchOrder;
const deleteOrder = (req, res) => {
    return res.json({ data: "Delete Orders" }).status(201);
};
exports.deleteOrder = deleteOrder;
