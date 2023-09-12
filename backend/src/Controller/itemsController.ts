import { Request, Response } from "express";
import Prisma from "../DB/prismaClient";
import { StatusCodes } from "http-status-codes";

interface Req extends Request {
	query: {
		name?: string;
		price?: string;
	};
	body: {
		name?: string;
		price?: string | number;
		description?: string;
		amountInStock?: string | number;
		priceBought?: string | number;
	};
}

export const getItems = async (req: Req, res: Response) => {
	const { name, price } = req.query;

	const items = await Prisma.items.findMany({
		where: {
			name: {
				contains: name,
			},
			price: {
				gte: price ? Number(price) : undefined,
				// TODO: Change the price to number and assign it to a variable and add error checking
			},
		},
	});

	return res
		.json({ message: "success", data: items, count: items.length })
		.status(StatusCodes.OK);
};

export const addItem = async (req: Request, res: Response) => {
	const { name, price, description, amountInStock, priceBought } = req.body;

	if (!name || !price || !description || !amountInStock || !priceBought) {
		return new Error("Not all required fields were provided.");
	}

	if ()
	// TODO: Better error checking...
	const item = await Prisma.items.create({
		data: {
			name,
			price,
			description,
			amountInStock,
			priceBought
		},
	});
	return res.json({ data: "POST items" }).status(201);
};

export const getItem = async (req: Req, res: Response) => {
	const { id } = req.params;
	const item = await Prisma.items.findUnique({
		where: {
			id,
		},
		include: {
			order: true,
		},
	});
	return res
		.json({ message: "success", data: item })
		.status(StatusCodes.CREATED);
};

export const patchItem = (req: Request, res: Response) => {
	return res.json({ data: "PATCH item" }).status(201);
};

export const deleteItem = async (req: Request, res: Response) => {
	// TODO: permission checking
	const { id } = req.params;
	await Prisma.items.delete({
		where: { id },
	});
	return res.json({ message: "success" }).status(StatusCodes.ACCEPTED);
};
