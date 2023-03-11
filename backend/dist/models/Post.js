"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
    },
    body: {
        type: String,
        required: [true, "post description is required"],
        trim: true,
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"],
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "post category is required"],
    },
    file: {
        type: String,
    },
    tags: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
}, { timestamps: true });
const Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
