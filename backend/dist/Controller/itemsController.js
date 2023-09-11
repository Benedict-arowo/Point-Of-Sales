"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.patchItem = exports.getItem = exports.addItem = exports.getItems = void 0;
const getItems = (req, res) => {
    return res.json({ data: "GET items" }).status(200);
};
exports.getItems = getItems;
const addItem = (req, res) => {
    return res.json({ data: "POST items" }).status(201);
};
exports.addItem = addItem;
const getItem = (req, res) => {
    return res.json({ data: "GET item" }).status(201);
};
exports.getItem = getItem;
const patchItem = (req, res) => {
    return res.json({ data: "PATCH item" }).status(201);
};
exports.patchItem = patchItem;
const deleteItem = (req, res) => {
    return res.json({ data: "Delete items" }).status(201);
};
exports.deleteItem = deleteItem;
