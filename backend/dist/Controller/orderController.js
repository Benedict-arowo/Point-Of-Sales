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
exports.deleteOrder = exports.patchOrder = exports.getOrder = exports.getOrders = void 0;
const prismaClient_1 = __importDefault(require("../DB/prismaClient"));
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../Middlewear/errorHandler");
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
        orderBy: {
            id: "desc",
        },
    });
    return res.json({ msg: "success", data: orders }).status(http_status_codes_1.StatusCodes.OK);
});
exports.getOrders = getOrders;
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield prismaClient_1.default.orders.findUnique({
        where: { id: parseInt(id) },
        include: {
            items: {
                select: {
                    id: true,
                    itemId: true,
                    quantity: true,
                    total: true,
                    created: true,
                },
            },
        },
    });
    return res.json({ msg: "success", data }).status(http_status_codes_1.StatusCodes.OK);
});
exports.getOrder = getOrder;
const patchOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { params: { id }, body: { name, paymentMethod, items }, } = req;
    const data = yield prismaClient_1.default.orders.update({
        where: { id: parseInt(id) },
        data: {
            name,
            paymentMethod,
        },
    });
    return res.json({ msg: "success", data }).status(201);
});
exports.patchOrder = patchOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || typeof id != "number")
        throw new errorHandler_1.ErrorHandler("Invalid ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
    yield prismaClient_1.default.orders.delete({ where: { id } });
    return res.json({ msg: "success" }).status(http_status_codes_1.StatusCodes.OK);
});
exports.deleteOrder = deleteOrder;
