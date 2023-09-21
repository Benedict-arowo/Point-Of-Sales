"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.patchOrder = exports.getOrder = exports.getOrders = void 0;
const prismaClient_1 = __importDefault(require("../../DB/prismaClient"));
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../../Middlewear/errorHandler");
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const orders = yield prismaClient_1.default.orders.findMany({
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
});
exports.getOrders = getOrders;
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
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield prismaClient_1.default.orders.findUnique({
        where: { id: parseInt(id) },
        include: {
            items: true,
        },
    });
    return res.json({ msg: "success", data }).status(http_status_codes_1.StatusCodes.OK);
});
exports.getOrder = getOrder;
const patchOrder = (req, res) => {
    return res.json({ data: "PATCH Order" }).status(201);
};
exports.patchOrder = patchOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || typeof id != "number")
        throw new errorHandler_1.ErrorHandler("Invalid ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
    yield prismaClient_1.default.orders.delete({ where: { id } });
    return res.json({ msg: "success" }).status(http_status_codes_1.StatusCodes.OK);
});
exports.deleteOrder = deleteOrder;
