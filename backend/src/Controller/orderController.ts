import { Request, Response } from "express";
import prisma from "../DB/prismaClient";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import { ErrorHandler } from "../Middlewear/errorHandler";

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
	itemId: string;
	quantity: number;
	total: number;
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
					quantity: true,
					item: {
						select: {
							name: true,
							pricePerUnit: true,
							unitsInStock: true,
						},
					},
				},
			},
		},
	});
	return res.json({ msg: "success", data: orders }).status(200);
};

export const createOrder = async (req: Request, res: Response) => {
	const { name, paymentMethod, items } = req.body;

	if (!name || !paymentMethod || !items || items.length === 0)
		throw new ErrorHandler(
			"Name, PaymentMethod, and Items are all required fields.",
			StatusCodes.BAD_REQUEST
		);

	let total = 0;
	let i: i[] = [];
	//* Calculating the total amount, and also arranging the data to be pushed into the database.
	items.forEach((item: Items) => {
		i.push({
			itemId: item.id,
			quantity: item.quantity,
			total: item.quantity * item.pricePerUnit,
		});
		total += item.quantity * item.pricePerUnit;
	});

	const order = await prisma.orders.create({
		data: {
			name,
			paymentMethod,
			total,
			items: {
				createMany: {
					data: i,
				},
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
	if (!id || typeof id != "number")
		throw new ErrorHandler("Invalid ID", StatusCodes.BAD_REQUEST);
	await prisma.orders.delete({ where: { id } });
	return res.json({ msg: "success" }).status(StatusCodes.OK);
};
