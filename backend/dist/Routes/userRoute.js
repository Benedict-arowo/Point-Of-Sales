"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../Controller/userController");
const wrapper_1 = __importDefault(require("../Middlewear/wrapper"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.route("/").get((0, wrapper_1.default)(userController_1.getUsers)).post((0, wrapper_1.default)(userController_1.createUser));
exports.userRouter.route("/login").post((0, wrapper_1.default)(userController_1.loginUser));
