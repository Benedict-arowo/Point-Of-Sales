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
exports.deleteOrder = exports.patchOrder = exports.getOrder = exports.addOrder = exports.getOrders = void 0;
const prismaClient_1 = __importDefault(require("../DB/prismaClient"));
const http_status_codes_1 = require("http-status-codes");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const orders = yield prismaClient_1.default.orders.findMany({
        where: {
            name: {
                startsWith: name,
                contains: name,
            },
        },
        include: {
            items: {
                select: {
                    id: true,
                    price: true,
                    amountInStock: true,
                    created: true,
                },
            },
        },
    });
    return res.json({ msg: "success", data: orders }).status(200);
});
exports.getOrders = getOrders;
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, paymentMethod, items } = req.body;
    const order = yield prismaClient_1.default.orders.create({
        data: {
            name,
            paymentMethod,
            total: 1,
            items: {
                connect: items,
            },
        },
    });
    // TODO: Calculate the total price.
    return res
        .json({ msg: "success", data: order })
        .status(http_status_codes_1.StatusCodes.CREATED);
});
exports.addOrder = addOrder;
const getOrder = (req, res) => {
    return res.json({ data: "GET Order" }).status(201);
};
exports.getOrder = getOrder;
const patchOrder = (req, res) => {
    return res.json({ data: "PATCH Order" }).status(201);
};
exports.patchOrder = patchOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || typeof id != "number")
        throw new Error("Invalid ID");
    yield prismaClient_1.default.orders.delete({ where: { id } });
    return res.json({ msg: "success" }).status(http_status_codes_1.StatusCodes.OK);
});
exports.deleteOrder = deleteOrder;
