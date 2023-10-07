import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorHandler } from "../Middlewear/errorHandler";
import Prisma from "../DB/prismaClient";
import argon2 from "argon2";
import { Req } from "./itemsController";

const userSelect = { id: true, username: true, role: true };

export const getUsers = async (req: Request, res: Response) => {
	const users = await Prisma.user.findMany({
		select: userSelect,
	});
	res.json({ msg: "success", data: users }).status(StatusCodes.OK);
};

export const createUser = async (req: Request, res: Response) => {
	const { username, password, role } = req.body;

	// Checking if username exists and that its more than 3 characters.
	if (!username || username.length < 3)
		throw new ErrorHandler(
			"Username must be provided, and must be more than 3 characters.",
			StatusCodes.BAD_REQUEST
		);
	// TODO: Better password validation. (Regex)
	// Checking if password exists and that its more than 8 characters.
	if (!password || password.length < 8)
		throw new ErrorHandler(
			"Password must be provided, and must be more than 8 characters.",
			StatusCodes.BAD_REQUEST
		);

	// Checks if a valid role has been given, or none has been given.
	if (!(role === "ADMIN" || role === "USER" || role === undefined))
		throw new ErrorHandler(
			"The role provided does not exist.",
			StatusCodes.BAD_REQUEST
		);

	const hashedPassword = await argon2.hash(password);
	await Prisma.user.create({
		data: {
			username,
			password: hashedPassword,
			role,
		},
	});

	res.json({ msg: "success" }).status(StatusCodes.CREATED);
};

export const loginUser = async (req: Req, res: Response) => {
	const { password, username } = req.body;

	if (!username)
		throw new ErrorHandler(
			"Email must be provided",
			StatusCodes.BAD_REQUEST
		);
	if (!password)
		throw new ErrorHandler(
			"Password must be provided",
			StatusCodes.BAD_REQUEST
		);

	// * Looks for the user, and if it can't find the user with the specified username it throws an error.
	const user = await Prisma.user.findUnique({
		where: { username },
		select: {
			password: true,
		},
	});
	if (!user)
		throw new ErrorHandler("Invalid username", StatusCodes.BAD_REQUEST);

	const verifyPassword = argon2.verify(user.password, password);
	console.log(verifyPassword);
	// TODO: Verify if password matches
	// TODO: Sign User In

	return res.json({ msg: "loginUser" }).status(StatusCodes.OK);
};
