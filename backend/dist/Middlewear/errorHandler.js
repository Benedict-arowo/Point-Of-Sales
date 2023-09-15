"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    res.json({ status: "error", error: err.message }).status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
};
exports.default = errorHandler;
