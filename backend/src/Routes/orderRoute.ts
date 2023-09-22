import { Router } from "express";
import {
	deleteOrder,
	getOrder,
	getOrders,
	patchOrder,
} from "../Controller/orderController";
import { createOrder } from "../Services/Order/createOrder";
import Wrapper from "../Middlewear/wrapper";

export const orderRouter = Router();

orderRouter.route("/").get(Wrapper(getOrders)).post(Wrapper(createOrder));
orderRouter
	.route("/:id")
	.get(Wrapper(getOrder))
	.patch(Wrapper(patchOrder))
	.delete(Wrapper(deleteOrder));
