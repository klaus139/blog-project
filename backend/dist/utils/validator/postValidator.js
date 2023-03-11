"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostValidator = exports.removePostValidator = exports.updatePostValidator = exports.createPostValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = require("../../middleware/validatorMiddleware");
const valideMongoDBObject_1 = require("../valideMongoDBObject");
const Category_1 = __importDefault(require("../../models/Category"));
exports.createPostValidator = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("title is not allowed to be empty")
        .isLength({ max: 200 })
        .withMessage("title length must be less than or equal to 200 characters long")
        .isLength({ min: 5 })
        .withMessage("title length must be at least 5 characters long"),
    (0, express_validator_1.body)("body")
        .notEmpty()
        .withMessage("description is not allowed to be empty")
        .isLength({ max: 5000 })
        .withMessage("title length must be less than or equal to 5000 characters long"),
    (0, express_validator_1.body)("category")
        .notEmpty()
        .withMessage("category is not allowed to be empty")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, valideMongoDBObject_1.isValidObjectId)(value)) {
            throw new Error(`Invalid Category id format`);
        }
        // Check if category found
        const category = yield Category_1.default.findById(value);
        if (!category) {
            throw Error(`No category for this id ${value}`);
        }
    })),
    validatorMiddleware_1.validatorResult,
];
exports.updatePostValidator = [
    (0, express_validator_1.body)("id").custom((value, { req }) => {
        if (!(0, valideMongoDBObject_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Post id format`);
        }
        return true;
    }),
    (0, express_validator_1.body)("title")
        .optional()
        .isLength({ max: 20 })
        .withMessage("title length must be less than or equal to 20 characters long")
        .isLength({ min: 2 })
        .withMessage("title length must be at least 2 characters long"),
    (0, express_validator_1.body)("description")
        .optional()
        .isLength({ min: 2 })
        .withMessage("description length must be at least 2 characters long")
        .isLength({ max: 600 })
        .withMessage("description length must be less than or equal to 600 characters long"),
    validatorMiddleware_1.validatorResult,
];
exports.removePostValidator = [
    (0, express_validator_1.body)("id").custom((value, { req }) => {
        if (!(0, valideMongoDBObject_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Post id format`);
        }
        return true;
    }),
    validatorMiddleware_1.validatorResult,
];
exports.getPostValidator = [
    (0, express_validator_1.body)("id").custom((value, { req }) => {
        if (!(0, valideMongoDBObject_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Post id format`);
        }
        return true;
    }),
    validatorMiddleware_1.validatorResult,
];
