"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../middleware/authorization");
const commentValidator_1 = require("../utils/validator/commentValidator");
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
// @desc create comment
// @access protect
router.post("/", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("user", "admin"), commentValidator_1.createCommentValidator, commentController_1.createComment);
// @desc update comment
// @access protect
router.put("/:id", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("user", "admin"), commentValidator_1.updateCommentValidator, commentController_1.updateComment);
// @desc delete comment
// @access protect
router.delete("/:id", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("user", "admin"), commentValidator_1.deleteCommentValidator, commentController_1.deleteComment);
// @desc get a single comment
router.get("/:id", commentValidator_1.getCommentValidator, commentController_1.getComment);
// @desc get all comment
router.get("/", commentController_1.allComments);
exports.default = router;
