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
exports.loginUser = exports.createUser = exports.getUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandler_1 = require("../Middlewear/errorHandler");
const prismaClient_1 = __importDefault(require("../DB/prismaClient"));
const argon2_1 = __importDefault(require("argon2"));
const userSelect = { id: true, username: true, role: true };
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prismaClient_1.default.user.findMany({
        select: userSelect,
    });
    res.json({ msg: "success", data: users }).status(http_status_codes_1.StatusCodes.OK);
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    // Checking if username exists and that its more than 3 characters.
    if (!username || username.length < 3)
        throw new errorHandler_1.ErrorHandler("Username must be provided, and must be more than 3 characters.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    // TODO: Better password validation. (Regex)
    // Checking if password exists and that its more than 8 characters.
    if (!password || password.length < 8)
        throw new errorHandler_1.ErrorHandler("Password must be provided, and must be more than 8 characters.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    // Checks if a valid role has been given, or none has been given.
    if (!(role === "ADMIN" || role === "USER" || role === undefined))
        throw new errorHandler_1.ErrorHandler("The role provided does not exist.", http_status_codes_1.StatusCodes.BAD_REQUEST);
    const hashedPassword = yield argon2_1.default.hash(password);
    yield prismaClient_1.default.user.create({
        data: {
            username,
            password: hashedPassword,
            role,
        },
    });
    res.json({ msg: "success" }).status(http_status_codes_1.StatusCodes.CREATED);
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, username } = req.body;
    if (!username)
        throw new errorHandler_1.ErrorHandler("Email must be provided", http_status_codes_1.StatusCodes.BAD_REQUEST);
    if (!password)
        throw new errorHandler_1.ErrorHandler("Password must be provided", http_status_codes_1.StatusCodes.BAD_REQUEST);
    // * Looks for the user, and if it can't find the user with the specified username it throws an error.
    const user = yield prismaClient_1.default.user.findUnique({
        where: { username },
        select: {
            password: true,
        },
    });
    if (!user)
        throw new errorHandler_1.ErrorHandler("Invalid username", http_status_codes_1.StatusCodes.BAD_REQUEST);
    const verifyPassword = argon2_1.default.verify(user.password, password);
    console.log(verifyPassword);
    // TODO: Verify if password matches
    // TODO: Sign User In
    return res.json({ msg: "loginUser" }).status(http_status_codes_1.StatusCodes.OK);
});
exports.loginUser = loginUser;
