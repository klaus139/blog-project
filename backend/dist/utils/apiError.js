"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = void 0;
class apiError extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
        this.status = `${statuscode}`.startsWith('4') ? "fail" : "error";
    }
}
exports.apiError = apiError;
