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
exports.deleteComment = exports.allComments = exports.getComment = exports.updateComment = exports.createComment = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const Comment_1 = __importDefault(require("../models/Comment"));
const handleFactory_1 = require("./handleFactory");
// @desc Create Comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment_1.default.create(req.body);
    // add comment to post
    yield Post_1.default.findByIdAndUpdate(req.post._id, {
        $addToSet: { comments: comment._id },
    }, { new: true });
    // add comment to user
    yield User_1.default.findByIdAndUpdate(req.user._id, {
        $addToSet: { comments: comment._id },
    }, { new: true });
    res.status(201).json({ data: comment });
});
exports.createComment = createComment;
// @desc Update Comment
exports.updateComment = (0, handleFactory_1.updateOne)(Comment_1.default, "comment");
// @desc Get a Single Comment
exports.getComment = (0, handleFactory_1.getOne)(Comment_1.default, "comment");
// @desc get All Comment
exports.allComments = (0, handleFactory_1.getAll)(Comment_1.default);
// @desc Delete Comment
exports.deleteComment = (0, handleFactory_1.deleteOne)(Comment_1.default, "comment");
