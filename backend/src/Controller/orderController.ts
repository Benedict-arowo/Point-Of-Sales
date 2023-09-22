import { Request, Response } from "express";
import prisma from "../DB/prismaClient";
import { StatusCodes } from "http-status-codes";
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
	return res.json({ msg: "success", data: orders }).status(StatusCodes.OK);
};

export const getOrder = async (req: Request, res: Response) => {
	const { id } = req.params;
	const data = await prisma.orders.findUnique({
		where: { id: parseInt(id) },
		include: {
			items: {
				select: {
					id: true,
					itemId: true,
					quantity: true,
					total: true,
					created: true,
				},
			},
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
