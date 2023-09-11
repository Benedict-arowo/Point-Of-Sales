import { Router } from "express";
import {
	addItem,
	deleteItem,
	getItem,
	getItems,
	patchItem,
} from "../Controller/itemsController";
export const itemRouter = Router();

itemRouter.route("/").get(getItems).post(addItem);
itemRouter.route("/:id").get(getItem).patch(patchItem).delete(deleteItem);
