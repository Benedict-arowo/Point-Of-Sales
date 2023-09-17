import { Request, Response } from "express";
import prisma from "../DB/prismaClient";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";

type Items = {
	id: string;
	imageLink: string;
	pricePerUnit: number;
	name: string;
	category: string;
	amountLeftInStock: number;
	quantity: number;
};

type i = {
	id: string;
};

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
					unitsInStock: true,
					created: true,
				},
			},
		},
	});
	return res.json({ msg: "success", data: orders }).status(200);
};

export const createOrder = async (req: Request, res: Response) => {
	const { name, paymentMethod, items } = req.body;

	let total = 0;
	let i: i[] = [];
	items.forEach((item: Items) => {
		i.push({ id: item.id });
		total += item.quantity * item.pricePerUnit;
	});

	const order = await prisma.orders.create({
		data: {
			name,
			paymentMethod,
			total,
			items: {
				connect: i,
			},
		},
	});
	// TODO: Calculate the total price.
	return res
		.json({ msg: "success", data: order })
		.status(StatusCodes.CREATED);
};

export const getOrder = async (req: Request, res: Response) => {
	const { id } = req.params;
	const data = await prisma.orders.findUnique({
		where: { id: parseInt(id) },
		include: {
			items: true,
		},
	});
	return res.json({ msg: "success", data }).status(StatusCodes.OK);
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
