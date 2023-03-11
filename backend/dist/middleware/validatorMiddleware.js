"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorResult = void 0;
const { body, validationResult } = require("express-validator");
const validatorResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validatorResult = validatorResult;
