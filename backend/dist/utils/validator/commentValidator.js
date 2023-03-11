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
exports.getCommentValidator = exports.deleteCommentValidator = exports.updateCommentValidator = exports.createCommentValidator = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const validatorMiddleware_1 = require("../../middleware/validatorMiddleware");
const Post_1 = __importDefault(require("../../models/Post"));
const Comment_1 = __importDefault(require("../../models/Comment"));
exports.createCommentValidator = [
    (0, express_validator_1.body)("description").notEmpty().withMessage("description is required"),
    (0, express_validator_1.body)("post")
        .notEmpty()
        .withMessage("post is required")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        req.body.user = req.user._id;
        if (!(0, mongoose_1.isValidObjectId)(req.body.post)) {
            throw new Error(`Invalid Post id format`);
        }
        // Check if The Post Found
        const post = yield Post_1.default.findById(value);
        if (!post) {
            throw new Error(`No post for this ${value}`);
        }
        req.post = post;
        return true;
    })),
    validatorMiddleware_1.validatorResult,
];
exports.updateCommentValidator = [
    (0, express_validator_1.body)("description").notEmpty().withMessage("description is required"),
    (0, express_validator_1.body)("id").custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Comment id format`);
        }
        // find the comment
        const comment = yield Comment_1.default.findById(req.params.id);
        if (!comment) {
            return new Error(`No comment for thi id ${req.params.id}`);
        }
        // Check if the user owner this comment
        if (req.user._id.toString() !== comment.user.toString()) {
            throw new Error(`you are not allowed to update this comment`, 403);
        }
    })),
    validatorMiddleware_1.validatorResult,
];
exports.deleteCommentValidator = [
    (0, express_validator_1.body)("id").custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Comment id format`);
        }
        // find the comment
        const comment = yield Comment_1.default.findById(req.params.id);
        if (!comment) {
            return new Error(`No comment for thi id ${req.params.id}`);
        }
        // Check if the user owner this comment
        if (req.user._id.toString() !== comment.user.toString()) {
            throw new Error(`you are not allowed to delete this comment`, 403);
        }
    })),
    validatorMiddleware_1.validatorResult,
];
exports.getCommentValidator = [
    (0, express_validator_1.body)("id").custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            throw new Error(`Invalid Comment id format`);
        }
    })),
    validatorMiddleware_1.validatorResult,
];
