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
exports.deletePost = exports.getPost = exports.allPosts = exports.updatePost = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const apiError_1 = require("../utils/apiError");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create The Post
    req.body.author = req.user._id;
    const post = yield Post_1.default.create(req.body);
    // Associate user to post
    yield User_1.default.findByIdAndUpdate(req.user._id, {
        $addToSet: { posts: post._id },
    }, { new: true });
    res.status(201).send({ data: post });
});
exports.createPost = createPost;
// @desc Update Post
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield Post_1.default.findById(id);
    if (!post) {
        return next(new apiError_1.apiError(`No Post for this id ${id}`, 400));
    }
    // Check if The Post Belong To User
    if (post.author.toString() !== req.user._id.toString()) {
        return next(new apiError_1.apiError(`You are not allowed to update this post`, 403));
    }
    const doc = yield Post_1.default.findOneAndUpdate(post._id, req.body, { new: true });
    res.status(200).json({ data: doc });
});
exports.updatePost = updatePost;
// @desc Get List of Posts
const allPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find().populate("author");
        res.status(200).json({ size: posts.length, data: posts });
    }
    catch (error) {
        res.status(500).json({ error: "Unable to fetch posts" });
    }
});
exports.allPosts = allPosts;
//@desc Get a single post
exports.getPost = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findById(req.params.id).populate("author");
    if (!post) {
        return next(new apiError_1.apiError(`No post for this id ${req.params.id}`, 404));
    }
    // if (post.author.blocked.includes(req.user._id)) {
    //   return next(
    //     new apiError(`Sorry, You Are Not Allowed to Access This Post`, 403)
    //   );
    // }
    res.send(post);
}));
//export const getPost = getOne(Post, "post");
// @desc Delete Post
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const post = yield Post_1.default.findById(id);
    if (!post) {
        return next(new apiError_1.apiError(`No Post for this id ${id}`, 400));
    }
    // Check if The Post Belong To User
    if (post.author.toString() !== req.user._id.toString()) {
        return next(new apiError_1.apiError(`You are not allowed to delete this post`, 403));
    }
    yield Post_1.default.findByIdAndDelete(id);
    //
    yield User_1.default.findByIdAndUpdate(req.user._id, {
        $pull: { posts: post._id },
    }, { new: true });
    res.status(204).json({ message: "post deleted successfully" });
});
exports.deletePost = deletePost;
