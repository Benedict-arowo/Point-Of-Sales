import { StatusCodes } from "http-status-codes";
import { Req } from "../../Controller/itemsController";
import { Response } from "express";
import Prisma from "../../DB/prismaClient";

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
		throw new Error(
			"name, price, priceBought, and unitsInStock are all required fields."
		);

	if (category && !CategoryList.includes(category.toUpperCase()))
		throw new Error("Invalid Category.");

	if (typeof pricePerUnit !== "number" || typeof priceBought !== "number")
		throw new Error("All prices must be numbers.");

	if (typeof unitsInStock !== "number")
		throw new Error("unitsInStock must be in numbers.");

	return await Prisma.items.create({
		data: {
			name,
			pricePerUnit: Number(pricePerUnit),
			description,
			unitsInStock: Number(unitsInStock),
			priceBought: Number(priceBought),
			category: category || undefined,
			reorderLevel: "LOW",
		},
		select: {
			id: true,
			name: true,
			created: true,
		},
	});
};

export default addItem;
