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
exports.createOrder = void 0;
const prismaClient_1 = __importDefault(require("../../DB/prismaClient"));
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../../Middlewear/errorHandler");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, paymentMethod, items } = req.body;
    const itemsForCreation = [];
    let total = 0;
    //* Checking if all required fields are provided.
    if (!paymentMethod || !items || items.length === 0)
        throw new errorHandler_1.ErrorHandler("PaymentMethod, and Items are all required fields.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    //* Calculating the total amount, and also arranging the data to be pushed into the database.
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const savedVersionOfItem = yield prismaClient_1.default.items.findUnique({
            where: {
                id: item.id,
            },
            select: {
                unitsInStock: true,
            },
        });
        //* Item not existing.
        if (!savedVersionOfItem) {
            throw new errorHandler_1.ErrorHandler("This item does not exist in the database.", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        //* Item out of stock.
        if (savedVersionOfItem.unitsInStock === 0) {
            throw new errorHandler_1.ErrorHandler(`${item.name} is currently out of stock.`, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        else if ((savedVersionOfItem === null || savedVersionOfItem === void 0 ? void 0 : savedVersionOfItem.unitsInStock) >= item.quantity) {
            itemsForCreation.push({
                itemId: item.id,
                quantity: item.quantity,
                total: item.quantity * item.pricePerUnit,
            });
            total += item.quantity * item.pricePerUnit;
        }
        else {
            // * When amount specified is greater than the amount left in stock.
            throw new errorHandler_1.ErrorHandler(`${item.name} is currently low in stock.`, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
    }
    if (itemsForCreation.length === 0)
        throw new errorHandler_1.ErrorHandler("No items were provided for this order.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    const order = yield prismaClient_1.default.orders.create({
        data: {
            name,
            paymentMethod,
            total,
            items: {
                createMany: {
                    data: itemsForCreation,
                },
            },
        },
        include: {
            items: {
                include: {
                    item: {
                        select: {
                            unitsInStock: true,
                        },
                    },
                },
            },
        },
    });
    order.items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        //* Reduce the number of unitsInStock, and checks if an item is out of stock.
        yield prismaClient_1.default.items.update({
            where: {
                id: item.itemId,
            },
            data: {
                unitsInStock: item.item.unitsInStock - item.quantity,
                isOutOfStock: item.item.unitsInStock - item.quantity === 0 ||
                    item.item.unitsInStock === 0
                    ? true
                    : false,
            },
        });
    }));
    return res
        .json({ msg: "success", data: order })
        .status(http_status_codes_1.StatusCodes.CREATED);
});
exports.createOrder = createOrder;
