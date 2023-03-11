"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrHandler = void 0;
const globalErrHandler = (err, req, res, next) => {
    res
        .status(err.statuscode ? err.statuscode : 500)
        .json({ status: err.status, message: err.message /*stack: err.stack */ });
};
exports.globalErrHandler = globalErrHandler;
