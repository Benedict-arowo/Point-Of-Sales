"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.ErrorHandler = ErrorHandler;
const errorHandler = (err, req, res, next) => {
    res.json({ status: "error", error: err.message }).status(err.code);
};
exports.default = errorHandler;
