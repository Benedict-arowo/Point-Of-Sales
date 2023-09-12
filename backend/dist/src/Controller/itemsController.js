"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.patchItem = exports.getItem = exports.addItem = exports.getItems = void 0;
const db_1 = __importDefault(require("../DB/db"));
const getItems = (req, res) => {
    const items = db_1.default.items.findMany({});
    return res.json({ data: items }).status(200);
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
