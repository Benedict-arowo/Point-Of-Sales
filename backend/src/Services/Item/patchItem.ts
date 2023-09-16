import { Req } from "../../Controller/itemsController";
import Prisma from "../../DB/prismaClient";

const patchItem = async (req: Req) => {
	const { id } = req.params;
	const {
		name,
		pricePerUnit,
		description,
		unitsInStock,
		priceBought,
		category,
	} = req.body;
	const CategoryList = ["FOOD", "DRINK", "GAMES"];

	// if (!name || !pricePerUnit || !priceBought || !unitsInStock)
	// 	throw new Error(
	// 		"name, price, priceBought, and unitsInStock are all required fields."
	// 	);

	if (category && !CategoryList.includes(category.toUpperCase()))
		throw new Error("Invalid Category.");

	if (
		(pricePerUnit && typeof pricePerUnit !== "number") ||
		(priceBought && typeof priceBought !== "number")
	)
		throw new Error("All prices must be numbers.");

	if (unitsInStock && typeof unitsInStock !== "number")
		throw new Error("unitsInStock must be in numbers.");

	return await Prisma.items.update({
		where: { id },
		data: {
			name,
			unitsInStock,
			pricePerUnit,
			priceBought,
			category,
			description,
		},
		select: {
			id: true,
			name: true,
			created: true,
		},
	});
};

export default patchItem;
