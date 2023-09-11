"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = require("express");
const itemsController_1 = require("../Controller/itemsController");
exports.itemRouter = (0, express_1.Router)();
exports.itemRouter.route("/").get(itemsController_1.getItems).post(itemsController_1.addItem);
exports.itemRouter.route("/:id").get(itemsController_1.getItem).patch(itemsController_1.patchItem).delete(itemsController_1.deleteItem);
