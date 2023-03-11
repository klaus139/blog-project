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
exports.registerAdmin = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const validation_1 = require("../utils/validation");
const uuid_1 = require("uuid");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        const uuiduser = (0, uuid_1.v4)();
        if (!name || !email || !phone || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }
        const validateResult = validation_1.registerSchema.validate(req.body);
        if (validateResult.error) {
            console.log(validateResult.error);
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        // Hash password
        const salt = yield (0, validation_1.GenerateSalt)();
        const userPassword = (yield (0, validation_1.GeneratePassword)(password, salt));
        // Create the user
        const user = yield User_1.default.create({
            name,
            email,
            password: userPassword,
            phone,
            role: 'user',
            salt,
        });
        if (user) {
            res.status(201).json({ token: (0, validation_1.createToken)(user._id), data: user });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.registerUser = registerUser;
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            res.status(400);
            throw new Error("Please add all fields");
        }
        const validateResult = validation_1.registerSchema.validate(req.body, validation_1.option);
        if (validateResult.error) {
            console.log(validateResult.error);
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        // Check if user exists
        // Hash password
        const salt = yield (0, validation_1.GenerateSalt)();
        const userPassword = (yield (0, validation_1.GeneratePassword)(password, salt));
        // Create the user
        const admin = yield User_1.default.create({
            name,
            email,
            password: userPassword,
            phone,
            role: 'admin',
            salt,
        });
        if (admin) {
            res.status(201).json({ message: 'admin created', token: (0, validation_1.createToken)(admin._id), data: admin });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.registerAdmin = registerAdmin;
