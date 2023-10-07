import { Router } from "express";
import { createUser, getUsers, loginUser } from "../Controller/userController";
import Wrapper from "../Middlewear/wrapper";

export const userRouter = Router();

userRouter.route("/").get(Wrapper(getUsers)).post(Wrapper(createUser));
userRouter.route("/login").post(Wrapper(loginUser));
