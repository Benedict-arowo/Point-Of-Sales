import { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
	code: number;

	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
}

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.json({ status: "error", error: err.message }).status(err.code);
};

export default errorHandler;
