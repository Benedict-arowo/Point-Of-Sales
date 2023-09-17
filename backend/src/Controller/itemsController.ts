import { Request, Response } from "express";
import prisma from "../DB/prismaClient";
import { StatusCodes } from "http-status-codes";
import { CategoryList } from "@prisma/client";
import addItemService from "../Services/Item/addItem";
import patchItemService from "../Services/Item/patchItem";
export interface Req extends Request {
	query: {
		name?: string;
		price?: string;
		includeOrders?: string;
	};
	body: {
		name?: string;
		price?: number;
		description?: string;
		unitsInStock?: number;
		pricePerUnit?: number;
		priceBought?: number;
		category: CategoryList;
	};
}

const isNumber = (value: any) => {
	// Returns true if the value is a number, and false otherwise.
	return typeof value === "number";
};

export const getItems = async (req: Req, res: Response) => {
	const { name } = req.query;

	const items = await prisma.items.findMany({
		where: {
			name: {
				startsWith: name,
				mode: "insensitive",
			},
		},
	});

	return res
		.json({ msg: "success", data: items, count: items.length })
		.status(StatusCodes.OK);
};

export const addItem = async (req: Req, res: Response) => {
	const data = await addItemService(req, res);
	return res.json({ msg: "success", data }).status(201);
};

export const getItem = async (req: Req, res: Response) => {
	const { id } = req.params;
	const item = await prisma.items.findUnique({
		where: {
			id,
		},
	});

	return res.json({ msg: "success", data: item }).status(StatusCodes.OK);
};

export const patchItem = async (req: Req, res: Response) => {
	// TODO: Permission checking
	const data = await patchItemService(req);
	return res.json({ msg: "success", data }).status(StatusCodes.OK);
};

export const deleteItem = async (req: Request, res: Response) => {
	// TODO: permission checking
	const { id } = req.params;
	await prisma.items.deleteMany({
		where: { id },
	});
	return res.json({ message: "success" }).status(StatusCodes.OK);
};
