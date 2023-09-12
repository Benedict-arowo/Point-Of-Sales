"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.patchItem = exports.getItem = exports.addItem = exports.getItems = void 0;
const prismaClient_1 = __importDefault(require("../DB/prismaClient"));
const http_status_codes_1 = require("http-status-codes");
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.query;
    const items = yield prismaClient_1.default.items.findMany({
        where: {
            name: {
                contains: name,
            },
            price: {
                gte: price ? Number(price) : undefined,
                // TODO: Change the price to number and assign it to a variable and add error checking
            },
        },
    });
    return res
        .json({ message: "success", data: items, count: items.length })
        .status(http_status_codes_1.StatusCodes.OK);
});
exports.getItems = getItems;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, amountInStock, priceBought } = req.body;
    if (!name || !price || !description || !amountInStock || !priceBought) {
        return new Error("Not all required fields are provided.");
    }
    // TODO: Better error checking...
    const item = yield prismaClient_1.default.items.create({
        data: {
            name,
            price,
            description,
            amountInStock,
            priceBought: Number(priceBought),
        },
    });
    return res.json({ data: "POST items" }).status(201);
});
exports.addItem = addItem;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const item = yield prismaClient_1.default.items.findUnique({
        where: {
            id,
        },
        include: {
            order: true,
        },
    });
    return res
        .json({ message: "success", data: item })
        .status(http_status_codes_1.StatusCodes.CREATED);
});
exports.getItem = getItem;
const patchItem = (req, res) => {
    return res.json({ data: "PATCH item" }).status(201);
};
exports.patchItem = patchItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: permission checking
    const { id } = req.params;
    yield prismaClient_1.default.items.delete({
        where: { id },
    });
    return res.json({ message: "success" }).status(http_status_codes_1.StatusCodes.ACCEPTED);
});
exports.deleteItem = deleteItem;
