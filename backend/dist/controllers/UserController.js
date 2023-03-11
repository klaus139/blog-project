"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const handlers = require("./handlersFactory");
const cloudinary_1 = require("../config/cloudinary");
const { selectFields } = require("express-validator/src/select-fields");
const upload = (0, multer_1.default)({ storage: cloudinary_1.storage });
