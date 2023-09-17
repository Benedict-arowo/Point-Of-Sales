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
exports.deleteOrder = exports.patchOrder = exports.getOrder = exports.createOrder = exports.getOrders = void 0;
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
                    quantity: true,
                    item: {
                        select: {
                            name: true,
                            pricePerUnit: true,
                            unitsInStock: true,
                        },
                    },
                },
            },
        },
    });
    return res.json({ msg: "success", data: orders }).status(200);
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, paymentMethod, items } = req.body;
    if (!name || !paymentMethod || !items || items.length === 0)
        throw new Error("Name, PaymentMethod, and Items are all required fields.");
    let total = 0;
    let i = [];
    //* Calculating the total amount, and also arranging the data to be pushed into the database.
    items.forEach((item) => {
        i.push({
            itemId: item.id,
            quantity: item.quantity,
            total: item.quantity * item.pricePerUnit,
        });
        total += item.quantity * item.pricePerUnit;
    });
    const order = yield prismaClient_1.default.orders.create({
        data: {
            name,
            paymentMethod,
            total,
            items: {
                createMany: {
                    data: i,
                },
            },
        },
    });
    // TODO: Calculate the total price.
    return res
        .json({ msg: "success", data: order })
        .status(http_status_codes_1.StatusCodes.CREATED);
});
exports.createOrder = createOrder;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield prismaClient_1.default.orders.findUnique({
        where: { id: parseInt(id) },
        include: {
            items: true,
        },
    });
    return res.json({ msg: "success", data }).status(http_status_codes_1.StatusCodes.OK);
});
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
