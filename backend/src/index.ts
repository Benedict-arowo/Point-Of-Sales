import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { itemRouter } from "./Routes/itemsRoute";
import { orderRouter } from "./Routes/orderRoute";
import errorHandler from "./Middlewear/errorHandler";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.use("/items", itemRouter);
app.use("/orders", orderRouter);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
	res.json({ data: "Welcome" });
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// TODO:
//	- Items (GET, POST, PATCH, DELETE)
// 	- Orders (GET, POST, PATCH, DELETE)
