import { Request, Response } from "express";

export const getItems = (req: Request, res: Response) => {
	return res.json({ data: "GET items" }).status(200);
};

export const addItem = (req: Request, res: Response) => {
	return res.json({ data: "POST items" }).status(201);
};

export const getItem = (req: Request, res: Response) => {
	return res.json({ data: "GET item" }).status(201);
};

export const patchItem = (req: Request, res: Response) => {
	return res.json({ data: "PATCH item" }).status(201);
};

export const deleteItem = (req: Request, res: Response) => {
	return res.json({ data: "Delete items" }).status(201);
};
