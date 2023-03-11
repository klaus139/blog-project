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
exports.changeUserPasswordValidator = exports.updateUserValidator = exports.createUserValidator = exports.loginValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = require("../../middleware/validatorMiddleware");
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.signupValidator = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("firstname is not allowed to be empty")
        .isLength({ max: 10 })
        .withMessage("firstname length must be less than or equal to 10 characters long")
        .isLength({ min: 4 })
        .withMessage("firstname length must be at least 3 characters long"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is not allowed to be empty")
        .isLength({ max: 40 })
        .withMessage("email length must be less than or equal to 40 characters long")
        .isEmail()
        .withMessage("Email must be a valid email")
        .custom((email, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if Email Exist
        const user = yield User_1.default.findOne({ email: email });
        if (user) {
            return Promise.reject(new Error("E-mail already in use"));
        }
    })),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is not allowed to be empty")
        .isLength({ min: 5 })
        .withMessage("password length must be at least 5 characters long"),
    validatorMiddleware_1.validatorResult,
];
exports.loginValidator = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is not allowed to be empty")
        .isEmail()
        .withMessage("Email must be a valid email"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is not allowed to be empty"),
    validatorMiddleware_1.validatorResult,
];
exports.createUserValidator = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("firstname is not allowed to be empty")
        .isLength({ max: 40 })
        .withMessage("firstname length must be less than or equal to 40 characters long")
        .isLength({ min: 4 })
        .withMessage("firstname length must be at least 3 characters long"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is not allowed to be empty")
        .isLength({ max: 40 })
        .withMessage("email length must be less than or equal to 40 characters long")
        .isEmail()
        .withMessage("Email must be a valid email")
        .custom((email, { req: Request }) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if The Email Exist
        const user = yield User_1.default.findOne({ email: email });
        if (user) {
            throw new Error("User Already Exists");
        }
    })),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is not allowed to be empty")
        .isLength({ min: 5 })
        .withMessage("password length must be at least 5 characters long"),
    (0, express_validator_1.body)("role")
        .optional()
        .custom((role, { req }) => {
        const roles = ["user", "admin"];
        if (!roles.includes(role)) {
            throw new Error(`User validation failed: role: ${role} is not a valid enum value for path`);
        }
        return true;
    }),
    validatorMiddleware_1.validatorResult,
];
exports.updateUserValidator = [
    // body("id").isMongoId().withMessage("Invalid user id format"),
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage("firstname is not allowed to be empty")
        .isLength({ max: 40 })
        .withMessage("firstname length must be less than or equal to 40 characters long")
        .isLength({ min: 4 })
        .withMessage("firstname length must be at least 3 characters long"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("email is not allowed to be empty")
        .isLength({ max: 40 })
        .withMessage("email length must be less than or equal to 40 characters long")
        .isEmail()
        .withMessage("Email must be a valid email")
        .custom((email, { req: Request }) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if The Email Exist
        const user = yield User_1.default.findOne({ email: email });
        if (user) {
            throw new Error("User Already Exists");
        }
    })),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is not allowed to be empty")
        .isLength({ min: 5 })
        .withMessage("password length must be at least 5 characters long"),
    (0, express_validator_1.body)("role")
        .optional()
        .custom((role, { req }) => {
        const roles = ["user", "admin"];
        if (!roles.includes(role)) {
            throw new Error(`User validation failed: role: ${role} is not a valid enum value for path`);
        }
        return true;
    }),
    validatorMiddleware_1.validatorResult,
];
// export const deleteUserValidator = [
//   body("id").custom((value, { req:Request }) => {
//     if (!isValidObjectId(req.params.id)) {
//       throw new Error(`Invalid User id format`);
//     }
//     return true;
//   }),
//   validatorResult,
// ];
exports.changeUserPasswordValidator = [
    (0, express_validator_1.body)("currentPassword")
        .notEmpty()
        .withMessage("currentPassword is not allowed to be empty")
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        const isValidPassword = yield bcrypt_1.default.compare(value, req.user.password);
        if (!isValidPassword) {
            throw new Error("Incorrect current password");
        }
        // req.user.password === value
    })),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is not allowed to be empty"),
    validatorMiddleware_1.validatorResult,
];
// export const getUserValidator = [
//   body("id").custom((value, { req }) => {
//     if (!isValidObjectId(req.params.id)) {
//       throw new Error(`Invalid User id format`);
//     }
//     return true;
//   }),
//   validatorResult,
// ];
// export const getAllUserValidator = [
//   body("id").custom((value, { req }) => {
//     if (!isValidObjectId(req.params.id)) {
//       throw new Error(`Invalid User id format`);
//     }
//     return true;
//   }),
//   validatorResult,
// ];
