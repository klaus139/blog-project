"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryValidator = exports.updateCategoryValidator = exports.getCategoryValidator = exports.createCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const validatorMiddleware_1 = require("../../middleware/validatorMiddleware");
exports.createCategoryValidator = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("title is not allowed to be empty")
        .custom((title, { req }) => {
        req.body.slug = (0, slugify_1.default)(title.toLowerCase());
        req.body.user = req.user._id;
        return true;
    }),
    validatorMiddleware_1.validatorResult,
];
exports.getCategoryValidator = [
    (0, express_validator_1.body)("id").custom((value, { req }) => {
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Category id format`);
        }
        return true;
    }),
    validatorMiddleware_1.validatorResult,
];
exports.updateCategoryValidator = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("title is not allowed to be empty")
        .custom((title, { req }) => {
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Category id format`);
        }
        req.body.slug = (0, slugify_1.default)(title.toLowerCase());
        req.body.user = req.user._id;
        return true;
    }),
    validatorMiddleware_1.validatorResult,
];
exports.deleteCategoryValidator = [
    (0, express_validator_1.body)("id").custom((value, { req }) => {
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Category id format`);
        }
        return true;
    }),
    validatorMiddleware_1.validatorResult,
];
