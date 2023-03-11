"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    user: {
        type: Object,
        required: [true, "User is required"],
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, "Post is required"],
    },
    description: {
        type: String,
        required: [true, "Comment description is required"],
    },
}, {
    timestamps: true,
});
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
