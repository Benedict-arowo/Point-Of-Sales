import { Request, Response } from "express";
import prisma from "../../DB/prismaClient";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Prisma } from "@prisma/client";
import errorHandler, { ErrorHandler } from "../../Middlewear/errorHandler";

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
	return res.json({ msg: "success", data: orders }).status(200);
};

// export const createOrder = async (req: Request, res: Response) => {
// 	const { name, paymentMethod, items } = req.body;
// 	const itemsForCreation: i[] = [];
// 	let total = 0;

// 	if (!paymentMethod || !items || items.length === 0)
// 		throw new ErrorHandler(
// 			"PaymentMethod, and Items are all required fields.",
// 			StatusCodes.BAD_REQUEST
// 		);

// 	//* Calculating the total amount, and also arranging the data to be pushed into the database.
// 	for (let i = 0; i < items.length; i++) {
// 		const item = items[i];
// 		const savedVersionOfItem = await prisma.items.findUnique({
// 			where: {
// 				id: item.id,
// 			},
// 			select: {
// 				unitsInStock: true,
// 			},
// 		});

// 		if (!savedVersionOfItem) {
// 			throw new ErrorHandler(
// 				"This item does not exist in the database.",
// 				StatusCodes.BAD_REQUEST
// 			);
// 		}
// 		if (savedVersionOfItem?.unitsInStock > item.quantity) {
// 			itemsForCreation.push({
// 				itemId: item.id,
// 				quantity: item.quantity,
// 				total: item.quantity * item.pricePerUnit,
// 			});
// 			total += item.quantity * item.pricePerUnit;
// 		} else {
// 			console.log(item.quantity);
// 			throw new ErrorHandler(
// 				`${item.name} is currently low in stock.`,
// 				StatusCodes.BAD_REQUEST
// 			);
// 		}
// 	}

// 	if (itemsForCreation.length === 0)
// 		throw new ErrorHandler(
// 			ReasonPhrases.BAD_REQUEST,
// 			StatusCodes.BAD_REQUEST
// 		);

// 	const order = await prisma.orders.create({
// 		data: {
// 			name,
// 			paymentMethod,
// 			total,
// 			items: {
// 				createMany: {
// 					data: itemsForCreation,
// 				},
// 			},
// 		},
// 		include: {
// 			items: {
// 				include: {
// 					item: {
// 						select: {
// 							unitsInStock: true,
// 						},
// 					},
// 				},
// 			},
// 		},
// 	});

// 	order.items.forEach(async (item) => {
// 		// reduce the number of unitsInStock
// 		await prisma.items.update({
// 			where: {
// 				id: item.itemId,
// 			},
// 			data: {
// 				unitsInStock: item.item.unitsInStock - item.quantity,
// 			},
// 		});
// 	});

// 	// TODO: Calculate the total price.
// 	return res
// 		.json({ msg: "success", data: order })
// 		.status(StatusCodes.CREATED);
// };

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
