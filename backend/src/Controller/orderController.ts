import { Request, Response } from "express";
import prisma from "../DB/prismaClient";
import { StatusCodes } from "http-status-codes";

export const getOrders = async (req: Request, res: Response) => {
	const { name } = req.params;

	const orders = await prisma.orders.findMany({
		where: {
			name: {
				startsWith: name,
				contains: name,
			},
		},
		include: {
			items: {
				select: {
					id: true,
					price: true,
					amountInStock: true,
					created: true,
				},
			},
		},
	});
	return res.json({ msg: "success", data: orders }).status(200);
};

export const addOrder = async (req: Request, res: Response) => {
	const { name, paymentMethod, items } = req.body;
	const order = await prisma.orders.create({
		data: {
			name,
			paymentMethod,
			total: 1,
			items: {
				connect: items,
			},
		},
	});
	// TODO: Calculate the total price.
	return res
		.json({ msg: "success", data: order })
		.status(StatusCodes.CREATED);
};

export const getOrder = (req: Request, res: Response) => {
	return res.json({ data: "GET Order" }).status(201);
};

export const patchOrder = (req: Request, res: Response) => {
	return res.json({ data: "PATCH Order" }).status(201);
};

export const deleteOrder = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id || typeof id != "number") throw new Error("Invalid ID");
	await prisma.orders.delete({ where: { id } });
	return res.json({ msg: "success" }).status(StatusCodes.OK);
};
