import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const morgan = require("morgan");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
	res.json({ data: "Welcome" });
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// TODO:
//	- Items (GET, POST, PATCH, DELETE)
// 	- Orders (GET, POST, PATCH, DELETE)
