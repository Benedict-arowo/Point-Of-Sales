import { Router } from "express";
import {
	addOrder,
	deleteOrder,
	getOrder,
	getOrders,
	patchOrder,
} from "../Controller/orderController";

export const orderRouter = Router();

orderRouter.route("/").get(getOrders).post(addOrder);
orderRouter.route("/:id").get(getOrder).patch(patchOrder).delete(deleteOrder);
