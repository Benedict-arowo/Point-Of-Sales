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
const isNumber = (value) => {
    // Returns true if the value is a number, and false otherwise.
    return typeof value === "number";
};
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
        .json({ msg: "success", data: items, count: items.length })
        .status(http_status_codes_1.StatusCodes.OK);
});
exports.getItems = getItems;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, price, description, amountInStock, priceBought, category } = req.body;
    const CategoryList = ["FOOD", "DRINK", "GAMES"];
    if (!name || !price || !priceBought || !category) {
        return new Error("Name, Price, Description, PriceBought and Category are all required fields.");
    }
    if (category && !CategoryList.includes(category.toUpperCase())) {
        return res
            .json({ msg: "Invalid Category." })
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        // return new Error("Invalid Category.");
    }
    // TODO: A better way of checking if typeof an variable is a number.
    if (isNumber(price)) {
        console.log(1);
        return res
            .json({ msg: "Price must be a number." })
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        // return new Error("Price must be a number.");
    }
    if (isNumber(priceBought)) {
        console.log(2);
        return res
            .json({ msg: "Price Bought must be a number." })
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        // return new Error("Price must be a number.");
    }
    if (isNumber(amountInStock)) {
        console.log(3);
        return res
            .json({ msg: "Amount in Stock must be a number." })
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        // return new Error("amountInStock must be a number.");
    }
    console.log("Done checking");
    // TODO: Better error checking...
    const item = yield prismaClient_1.default.items.create({
        data: {
            name,
            price: Number(price),
            description,
            amountInStock: Number(amountInStock),
            priceBought: Number(priceBought),
            category: "FOOD",
        },
        select: {
            id: true,
            name: true,
            created: true,
        },
    });
    return res.json({ msg: "success", data: item }).status(201);
});
exports.addItem = addItem;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { includeOrders } = req.query;
    const item = yield prismaClient_1.default.items.findUnique({
        where: {
            id,
        },
        include: {
            order: includeOrders === "true" ? true : false,
        },
    });
    return res.json({ msg: "success", data: item }).status(http_status_codes_1.StatusCodes.OK);
});
exports.getItem = getItem;
const patchItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Permission checking
    const { id } = req.params;
    const { name, amountInStock, price, priceBought, category, description } = req.body;
    if (!name) {
        throw new Error("Name must be provided.");
    }
    if (!price) {
        throw new Error("Price must be provided.");
    }
    else if (!isNumber(price))
        throw new Error("Price must be a number.");
    if (!amountInStock) {
        throw new Error("Amount in Stock must be provided.");
    }
    else if (!isNumber(amountInStock))
        throw new Error("Amount in stock must be a number.");
    if (!priceBought) {
        throw new Error("Price bought must be provided.");
    }
    else if (!isNumber(priceBought))
        throw new Error("Price bought must be a number.");
    const item = yield prismaClient_1.default.items.update({
        where: { id },
        data: {
            name,
            amountInStock,
            price,
            priceBought,
            category,
            description,
        },
    });
    return res.json({ msg: "success", data: item }).status(http_status_codes_1.StatusCodes.OK);
});
exports.patchItem = patchItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: permission checking
    const { id } = req.params;
    yield prismaClient_1.default.items.delete({
        where: { id },
    });
    return res.json({ message: "success" }).status(http_status_codes_1.StatusCodes.OK);
});
exports.deleteItem = deleteItem;
