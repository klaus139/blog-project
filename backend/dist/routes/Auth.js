"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const userValidator_1 = require("../utils/validator/userValidator");
const router = express_1.default.Router();
router.post('/signup', userValidator_1.signupValidator, AuthController_1.registerUser);
router.post('/signup/admin', userValidator_1.signupValidator, AuthController_1.registerAdmin);
router.post('/login', userValidator_1.loginValidator, AuthController_1.Login);
exports.default = router;
