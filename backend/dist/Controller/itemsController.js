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
const addItem_1 = __importDefault(require("../Services/Item/addItem"));
const patchItem_1 = __importDefault(require("../Services/Item/patchItem"));
const isNumber = (value) => {
    // Returns true if the value is a number, and false otherwise.
    return typeof value === "number";
};
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    const items = yield prismaClient_1.default.items.findMany({
        where: {
            name: {
                startsWith: name,
                mode: "insensitive",
            },
        },
    });
    return res
        .json({ msg: "success", data: items, count: items.length })
        .status(http_status_codes_1.StatusCodes.OK);
});
exports.getItems = getItems;
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, addItem_1.default)(req, res);
    return res.json({ msg: "success", data }).status(201);
});
exports.addItem = addItem;
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const item = yield prismaClient_1.default.items.findUnique({
        where: {
            id,
        },
    });
    return res.json({ msg: "success", data: item }).status(http_status_codes_1.StatusCodes.OK);
});
exports.getItem = getItem;
const patchItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Permission checking
    const data = yield (0, patchItem_1.default)(req);
    return res.json({ msg: "success", data }).status(http_status_codes_1.StatusCodes.OK);
});
exports.patchItem = patchItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: permission checking
    const { id } = req.params;
    yield prismaClient_1.default.items.deleteMany({
        where: { id },
    });
    return res.json({ message: "success" }).status(http_status_codes_1.StatusCodes.OK);
});
exports.deleteItem = deleteItem;
