"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategory = exports.allCategories = exports.updateCategory = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const handleFactory_1 = require("./handleFactory");
exports.createCategory = (0, handleFactory_1.createOne)(Category_1.default);
exports.updateCategory = (0, handleFactory_1.updateOne)(Category_1.default, 'category');
exports.allCategories = (0, handleFactory_1.getAll)(Category_1.default);
exports.getCategory = (0, handleFactory_1.getOne)(Category_1.default, 'category');
exports.deleteCategory = (0, handleFactory_1.deleteOne)(Category_1.default, 'category');
