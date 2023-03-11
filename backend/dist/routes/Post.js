"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../controllers/PostController");
const authorization_1 = require("../middleware/authorization");
const postValidator_1 = require("../utils/validator/postValidator");
const router = express_1.default.Router();
// @desc Create Post
// @access Protect
router.post("/", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("admin"), postValidator_1.createPostValidator, PostController_1.createPost);
// @desc Update Post
// @access Protect
router.put("/:id", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("admin"), postValidator_1.updatePostValidator, PostController_1.updatePost);
// @desc get all Post
// @access Protect
router.get("/", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("admin", "user"), PostController_1.allPosts);
// @desc get a single Post
// @access Protect
router.get("/:id", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("admin", "user"), postValidator_1.getPostValidator, PostController_1.getPost);
// @desc Delete a Post
// @access Protect
router.delete("/:id", authorization_1.requireSignIn, (0, authorization_1.alowedTo)("admin"), postValidator_1.removePostValidator, PostController_1.deletePost);
exports.default = router;
