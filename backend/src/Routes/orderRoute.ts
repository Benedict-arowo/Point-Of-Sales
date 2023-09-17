import { Router } from "express";
import {
	createOrder,
	deleteOrder,
	getOrder,
	getOrders,
	patchOrder,
} from "../Controller/orderController";

export const orderRouter = Router();

orderRouter.route("/").get(getOrders).post(createOrder);
orderRouter.route("/:id").get(getOrder).patch(patchOrder).delete(deleteOrder);
