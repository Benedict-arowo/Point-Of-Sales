"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = require("express");
const itemsController_1 = require("../Controller/itemsController");
const wrapper_1 = __importDefault(require("../Middlewear/wrapper"));
exports.itemRouter = (0, express_1.Router)();
exports.itemRouter.route("/").get((0, wrapper_1.default)(itemsController_1.getItems)).post((0, wrapper_1.default)(itemsController_1.addItem));
exports.itemRouter
    .route("/:id")
    .get((0, wrapper_1.default)(itemsController_1.getItem))
    .patch((0, wrapper_1.default)(itemsController_1.patchItem))
    .delete((0, wrapper_1.default)(itemsController_1.deleteItem));
