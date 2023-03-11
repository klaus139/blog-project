import express from 'express';
import { allPosts, createPost, deletePost, getPost, updatePost } from '../controllers/PostController';
import { requireSignIn, alowedTo } from '../middleware/authorization';
import { createPostValidator, getPostValidator, removePostValidator, updatePostValidator } from '../utils/validator/postValidator';
const router = express.Router();



// @desc Create Post
// @access Protect
router.post(
  "/",
  requireSignIn,
  alowedTo("admin"),
 
  createPostValidator,
  createPost
);

// @desc Update Post
// @access Protect
router.put(
  "/:id",
  requireSignIn,
  alowedTo("admin"),
  updatePostValidator,
  updatePost
);

// @desc get all Post
// @access Protect
router.get("/", requireSignIn, alowedTo("admin", "user"), allPosts);

// @desc get a single Post
// @access Protect
router.get(
  "/:id",
  requireSignIn,
  alowedTo("admin", "user"),
  getPostValidator,
  getPost
);

// @desc Delete a Post
// @access Protect
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("admin"),
  removePostValidator,
  deletePost
);

export default router
