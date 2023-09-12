import { Router } from "express";
import {
	addItem,
	deleteItem,
	getItem,
	getItems,
	patchItem,
} from "../Controller/itemsController";
import Wrapper from "../Middlewear/wrapper";
export const itemRouter = Router();

itemRouter.route("/").get(Wrapper(getItems)).post(Wrapper(addItem));
itemRouter
	.route("/:id")
	.get(Wrapper(getItem))
	.patch(Wrapper(patchItem))
	.delete(Wrapper(deleteItem));
