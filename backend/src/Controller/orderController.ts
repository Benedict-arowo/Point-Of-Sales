import { Request, Response } from "express";

export const getOrders = (req: Request, res: Response) => {
	return res.json({ data: "GET Orders" }).status(200);
};

export const addOrder = (req: Request, res: Response) => {
	return res.json({ data: "POST Orders" }).status(201);
};

export const getOrder = (req: Request, res: Response) => {
	return res.json({ data: "GET Order" }).status(201);
};

export const patchOrder = (req: Request, res: Response) => {
	return res.json({ data: "PATCH Order" }).status(201);
};

export const deleteOrder = (req: Request, res: Response) => {
	return res.json({ data: "Delete Orders" }).status(201);
};
