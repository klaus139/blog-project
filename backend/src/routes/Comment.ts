import express from 'express';
import expess from 'express';
import { requireSignIn, alowedTo } from '../middleware/authorization';
import { createCommentValidator, updateCommentValidator, deleteCommentValidator, getCommentValidator } from '../utils/validator/commentValidator';
import { createComment, updateComment, deleteComment, getComment, allComments } from '../controllers/commentController';
const router = express.Router();





// @desc create comment
// @access protect
router.post(
  "/",
  requireSignIn,
  alowedTo("user", "admin"),
  createCommentValidator,
  createComment
);

// @desc update comment
// @access protect
router.put(
  "/:id",
  requireSignIn,
  alowedTo("user", "admin"),
  updateCommentValidator,
  updateComment
);

// @desc delete comment
// @access protect
router.delete(
  "/:id",
  requireSignIn,
  alowedTo("user", "admin"),
  deleteCommentValidator,
  deleteComment
);

// @desc get a single comment
router.get("/:id", getCommentValidator, getComment);

// @desc get all comment
router.get("/", allComments);

export default router;
