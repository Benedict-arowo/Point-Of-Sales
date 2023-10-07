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
	// Todo: Check if error is instance of ErrorHandler before sending out a response.
	console.log(err);
	res.status(err.code).json({ status: "error", error: err.message });
};

export default errorHandler;
