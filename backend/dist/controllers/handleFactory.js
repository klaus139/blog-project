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
exports.getAll = exports.getOne = exports.deleteOne = exports.updateOne = exports.createOne = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiError_1 = require("../utils/apiError");
const createOne = (Model) => (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newDoc = yield Model.create(req.body);
    res.status(201).json({ data: newDoc });
}));
exports.createOne = createOne;
const updateOne = (Model, name = "document") => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const document = yield Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!document) {
        return next(new apiError_1.apiError(`No ${name} for this id ${id}`, 404));
    }
    document.save();
    res.status(200).json({ data: document });
}));
exports.updateOne = updateOne;
const deleteOne = (Model, name = "document") => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Model.findByIdAndDelete(req.params.id);
    if (!document) {
        return next(new apiError_1.apiError(`No ${name} for this id ${req.params.id}`, 404));
    }
    res.status(204).json({ message: "comment deleted" });
}));
exports.deleteOne = deleteOne;
const getOne = (Model, name = "document") => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Model.findById(req.params.id);
    if (!document) {
        return next(new apiError_1.apiError(`No ${name} for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
}));
exports.getOne = getOne;
const getAll = (Model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const document = yield Model.find();
    res.status(200).json({ size: document.length, data: document });
}));
exports.getAll = getAll;
