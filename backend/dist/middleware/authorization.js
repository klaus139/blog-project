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
exports.alowedTo = exports.requireSignIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const User_1 = __importDefault(require("../models/User"));
const apiError_1 = require("../utils/apiError");
exports.requireSignIn = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Get token from header
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new apiError_1.apiError("You are not login, Please login to get access this route", 401));
    }
    // 2) Verify token (no change happens, expired token)
    const decoded = jsonwebtoken_1.default.verify(token, index_1.APP_SECRET, function (err, decoded) {
        if (err) {
            if (err.name === "JsonWebTokenError") {
                next(new apiError_1.apiError(err.message, 403));
            }
        }
        else {
            return decoded;
        }
    });
    if (decoded) {
        // 3) Check if user exists
        const user = yield User_1.default.findById(decoded.id);
        if (!user) {
            return next(new apiError_1.apiError("The user that belong to this token does no longer exist", 401));
        }
        // 4) Save the user into req object
        req.user = user;
        next();
    }
}));
// @Desc
const alowedTo = (...roles) => (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
        return next(new apiError_1.apiError("You are not allowed to access this route", 403));
    }
    next();
};
exports.alowedTo = alowedTo;
// @desc Make sure the user is logged in the same own url
//   exports.isAuth = (req, res, next) => {};
