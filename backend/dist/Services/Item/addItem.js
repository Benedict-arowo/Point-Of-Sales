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
const http_status_codes_1 = require("http-status-codes");
const prismaClient_1 = __importDefault(require("../../DB/prismaClient"));
const errorHandler_1 = require("../../Middlewear/errorHandler");
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, pricePerUnit, description, unitsInStock, priceBought, category, } = req.body;
    // TODO: Add permission support
    const CategoryList = ["FOOD", "DRINK", "GAMES"];
    if (!name || !pricePerUnit || !priceBought || !unitsInStock)
        throw new errorHandler_1.ErrorHandler("name, pricePerUnit, priceBought, and unitsInStock are all required fields.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    if (category && !CategoryList.includes(category.toUpperCase()))
        throw new errorHandler_1.ErrorHandler("Invalid Category.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    if (typeof pricePerUnit !== "number" || typeof priceBought !== "number")
        throw new errorHandler_1.ErrorHandler("All prices must be numbers.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    if (typeof unitsInStock !== "number")
        throw new errorHandler_1.ErrorHandler("unitsInStock must be in numbers.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    return yield prismaClient_1.default.items.create({
        data: {
            name,
            pricePerUnit: Number(pricePerUnit),
            description,
            unitsInStock: Number(unitsInStock),
            priceBought: Number(priceBought),
            category: category || undefined,
            reorderLevel: "LOW",
            isOutOfStock: false,
            initialQuantity: Number(unitsInStock),
            estimatedProfit: Number(pricePerUnit * Number(unitsInStock)) -
                Number(priceBought),
        },
        select: {
            id: true,
            name: true,
            created: true,
        },
    });
});
exports.default = addItem;
