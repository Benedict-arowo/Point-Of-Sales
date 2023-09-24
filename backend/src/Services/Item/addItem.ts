import { StatusCodes } from "http-status-codes";
import { Req } from "../../Controller/itemsController";
import { Response } from "express";
import Prisma from "../../DB/prismaClient";
import { ErrorHandler } from "../../Middlewear/errorHandler";

const addItem = async (req: Req, res: Response) => {
	const {
		name,
		pricePerUnit,
		description,
		unitsInStock,
		priceBought,
		category,
	} = req.body;

	// TODO: Add permission support

	const CategoryList = ["FOOD", "DRINK", "GAMES"];

	if (!name || !pricePerUnit || !priceBought || !unitsInStock)
		throw new ErrorHandler(
			"name, pricePerUnit, priceBought, and unitsInStock are all required fields.",
			StatusCodes.BAD_REQUEST
		);

	if (category && !CategoryList.includes(category.toUpperCase()))
		throw new ErrorHandler("Invalid Category.", StatusCodes.BAD_REQUEST);

	if (typeof pricePerUnit !== "number" || typeof priceBought !== "number")
		throw new ErrorHandler(
			"All prices must be numbers.",
			StatusCodes.BAD_REQUEST
		);

	if (typeof unitsInStock !== "number")
		throw new ErrorHandler(
			"unitsInStock must be in numbers.",
			StatusCodes.BAD_REQUEST
		);

	return await Prisma.items.create({
		data: {
			name,
			pricePerUnit: Number(pricePerUnit),
			description,
			unitsInStock: Number(unitsInStock),
			priceBought: Number(priceBought),
			category: category || undefined,
			reorderLevel: "LOW",
			isOutOfStock: false,
			initialQuantity: Number(unitsInStock),
			estimatedProfit:
				Number(pricePerUnit * Number(unitsInStock)) -
				Number(priceBought),
		},
		select: {
			id: true,
			name: true,
			created: true,
		},
	});
};

export default addItem;
