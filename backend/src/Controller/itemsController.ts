import { Request, Response } from "express";
import prisma from "../DB/prismaClient";
import { StatusCodes } from "http-status-codes";
import { CategoryList } from "@prisma/client";

interface Req extends Request {
	query: {
		name?: string;
		price?: string;
		includeOrders?: string;
	};
	body: {
		name?: string;
		price?: number;
		description?: string;
		amountInStock?: number;
		priceBought?: number;
		category: CategoryList;
	};
}

const isNumber = (value: any) => {
	// Returns true if the value is a number, and false otherwise.
	return typeof value === "number";
};

export const getItems = async (req: Req, res: Response) => {
	const { name, price } = req.query;

	const items = await prisma.items.findMany({
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
		.json({ msg: "success", data: items, count: items.length })
		.status(StatusCodes.OK);
};

export const addItem = async (req: Req, res: Response) => {
	console.log(req.body);
	const { name, price, description, amountInStock, priceBought, category } =
		req.body;
	const CategoryList = ["FOOD", "DRINK", "GAMES"];

	if (!name || !price || !priceBought || !category) {
		return new Error(
			"Name, Price, Description, PriceBought and Category are all required fields."
		);
	}

	if (category && !CategoryList.includes(category.toUpperCase())) {
		return res
			.json({ msg: "Invalid Category." })
			.status(StatusCodes.BAD_REQUEST);
		// return new Error("Invalid Category.");
	}

	// TODO: A better way of checking if typeof an variable is a number.
	if (isNumber(price)) {
		console.log(1);
		return res
			.json({ msg: "Price must be a number." })
			.status(StatusCodes.BAD_REQUEST);
		// return new Error("Price must be a number.");
	}

	if (isNumber(priceBought)) {
		console.log(2);
		return res
			.json({ msg: "Price Bought must be a number." })
			.status(StatusCodes.BAD_REQUEST);
		// return new Error("Price must be a number.");
	}

	if (isNumber(amountInStock)) {
		console.log(3);
		return res
			.json({ msg: "Amount in Stock must be a number." })
			.status(StatusCodes.BAD_REQUEST);
		// return new Error("amountInStock must be a number.");
	}
	console.log("Done checking");
	// TODO: Better error checking...
	const item = await prisma.items.create({
		data: {
			name,
			price: Number(price),
			description,
			amountInStock: Number(amountInStock),
			priceBought: Number(priceBought),
			category: "FOOD",
		},
		select: {
			id: true,
			name: true,
			created: true,
		},
	});

	return res.json({ msg: "success", data: item }).status(201);
};

export const getItem = async (req: Req, res: Response) => {
	const { id } = req.params;
	const { includeOrders } = req.query;
	const item = await prisma.items.findUnique({
		where: {
			id,
		},
		include: {
			order: includeOrders === "true" ? true : false,
		},
	});

	return res.json({ msg: "success", data: item }).status(StatusCodes.OK);
};

export const patchItem = async (req: Req, res: Response) => {
	// TODO: Permission checking
	const { id } = req.params;
	const { name, amountInStock, price, priceBought, category, description } =
		req.body;

	if (!name) {
		throw new Error("Name must be provided.");
	}

	if (!price) {
		throw new Error("Price must be provided.");
	} else if (!isNumber(price)) throw new Error("Price must be a number.");

	if (!amountInStock) {
		throw new Error("Amount in Stock must be provided.");
	} else if (!isNumber(amountInStock))
		throw new Error("Amount in stock must be a number.");

	if (!priceBought) {
		throw new Error("Price bought must be provided.");
	} else if (!isNumber(priceBought))
		throw new Error("Price bought must be a number.");

	const item = await prisma.items.update({
		where: { id },
		data: {
			name,
			amountInStock,
			price,
			priceBought,
			category,
			description,
		},
	});
	return res.json({ msg: "success", data: item }).status(StatusCodes.OK);
};

export const deleteItem = async (req: Request, res: Response) => {
	// TODO: permission checking
	const { id } = req.params;
	await prisma.items.delete({
		where: { id },
	});
	return res.json({ message: "success" }).status(StatusCodes.OK);
};
