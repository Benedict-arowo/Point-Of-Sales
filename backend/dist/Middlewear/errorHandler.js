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
    // Todo: Check if error is instance of ErrorHandler before sending out a response.
    console.log(err);
    res.status(err.code).json({ status: "error", error: err.message });
};
exports.default = errorHandler;
