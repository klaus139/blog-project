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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const User_1 = __importDefault(require("../models/User"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                Error: "Kindly login"
            });
        }
        //Bearer token
        const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, index_1.APP_SECRET);
        if (!verified) {
            return res.status(401).json({
                Error: "Unauthorized access"
            });
        }
        const { id } = verified;
        // find user by Id
        const user = yield User_1.default.findOne({
            where: { id: id }
        });
        if (!user) {
            return res.status(401).json({
                Error: "Unauthorized access"
            });
        }
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: "Unauthorized" });
    }
});
exports.auth = auth;
