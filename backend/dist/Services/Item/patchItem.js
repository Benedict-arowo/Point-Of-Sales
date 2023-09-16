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
const prismaClient_1 = __importDefault(require("../../DB/prismaClient"));
const patchItem = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, pricePerUnit, description, unitsInStock, priceBought, category, } = req.body;
    const CategoryList = ["FOOD", "DRINK", "GAMES"];
    // if (!name || !pricePerUnit || !priceBought || !unitsInStock)
    // 	throw new Error(
    // 		"name, price, priceBought, and unitsInStock are all required fields."
    // 	);
    if (category && !CategoryList.includes(category.toUpperCase()))
        throw new Error("Invalid Category.");
    if ((pricePerUnit && typeof pricePerUnit !== "number") ||
        (priceBought && typeof priceBought !== "number"))
        throw new Error("All prices must be numbers.");
    if (unitsInStock && typeof unitsInStock !== "number")
        throw new Error("unitsInStock must be in numbers.");
    return yield prismaClient_1.default.items.update({
        where: { id },
        data: {
            name,
            unitsInStock,
            pricePerUnit,
            priceBought,
            category,
            description,
        },
        select: {
            id: true,
            name: true,
            created: true,
        },
    });
});
exports.default = patchItem;
