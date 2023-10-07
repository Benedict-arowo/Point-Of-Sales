"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const itemsRoute_1 = require("./Routes/itemsRoute");
const orderRoute_1 = require("./Routes/orderRoute");
const errorHandler_1 = __importDefault(require("./Middlewear/errorHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const userRoute_1 = require("./Routes/userRoute");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/items", itemsRoute_1.itemRouter);
app.use("/orders", orderRoute_1.orderRouter);
app.use("/user", userRoute_1.userRouter);
app.use(errorHandler_1.default);
app.get("/", (req, res) => {
    res.json({ data: "Welcome" });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// TODO:
//	- Items (GET, POST, PATCH, DELETE)
// 	- Orders (GET, POST, PATCH, DELETE)
