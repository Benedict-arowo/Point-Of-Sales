import { Request, Response } from "express";
import prisma from "../../DB/prismaClient";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ErrorHandler } from "../../Middlewear/errorHandler";

type item = {
	itemId: string;
	quantity: number;
	total: number;
};

export const createOrder = async (req: Request, res: Response) => {
	const { name, paymentMethod, items } = req.body;
	const itemsForCreation: item[] = [];
	let total = 0;

	//* Checking if all required fields are provided.
	if (!paymentMethod || !items || items.length === 0)
		throw new ErrorHandler(
			"PaymentMethod, and Items are all required fields.",
			StatusCodes.BAD_REQUEST
		);

	//* Calculating the total amount, and also arranging the data to be pushed into the database.
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const savedVersionOfItem = await prisma.items.findUnique({
			where: {
				id: item.id,
			},
			select: {
				unitsInStock: true,
			},
		});

		//* Item not existing.
		if (!savedVersionOfItem) {
			throw new ErrorHandler(
				"This item does not exist in the database.",
				StatusCodes.BAD_REQUEST
			);
		}

		//* Item out of stock.
		if (savedVersionOfItem.unitsInStock === 0) {
			throw new ErrorHandler(
				`${item.name} is currently out of stock.`,
				StatusCodes.BAD_REQUEST
			);
		} else if (savedVersionOfItem?.unitsInStock >= item.quantity) {
			itemsForCreation.push({
				itemId: item.id,
				quantity: item.quantity,
				total: item.quantity * item.pricePerUnit,
			});
			total += item.quantity * item.pricePerUnit;
		} else {
			// * When amount specified is greater than the amount left in stock.
			throw new ErrorHandler(
				`${item.name} is currently low in stock.`,
				StatusCodes.BAD_REQUEST
			);
		}
	}

	if (itemsForCreation.length === 0)
		throw new ErrorHandler(
			"No items were provided for this order.",
			StatusCodes.BAD_REQUEST
		);

	const order = await prisma.orders.create({
		data: {
			name,
			paymentMethod,
			total,
			items: {
				createMany: {
					data: itemsForCreation,
				},
			},
		},
		include: {
			items: {
				include: {
					item: {
						select: {
							unitsInStock: true,
						},
					},
				},
			},
		},
	});

	order.items.forEach(async (item) => {
		//* Reduce the number of unitsInStock, and checks if an item is out of stock.
		await prisma.items.update({
			where: {
				id: item.itemId,
			},
			data: {
				unitsInStock: item.item.unitsInStock - item.quantity,
				isOutOfStock:
					item.item.unitsInStock - item.quantity === 0 ||
					item.item.unitsInStock === 0
						? true
						: false,
			},
		});
	});

	return res
		.json({ msg: "success", data: order })
		.status(StatusCodes.CREATED);
};
