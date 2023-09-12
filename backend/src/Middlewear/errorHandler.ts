import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.json({ status: "error", error: err }).status(
		StatusCodes.INTERNAL_SERVER_ERROR
	);
};

export default errorHandler;
