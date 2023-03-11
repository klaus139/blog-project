import express, {Request, Response, NextFunction} from 'express';
import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";
import { updateOne, getOne, getAll, deleteOne } from './handleFactory';
import { JwtPayload } from 'jsonwebtoken';

// @desc Create Comment
export const createComment = async (req:JwtPayload, res:Response) => {
  const comment = await Comment.create(req.body);

  // add comment to post
  await Post.findByIdAndUpdate(
    req.post._id,
    {
      $addToSet: { comments: comment._id },
    },
    { new: true }
  );

  // add comment to user
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { comments: comment._id },
    },
    { new: true }
  );

  res.status(201).json({ data: comment });
};

// @desc Update Comment
export const updateComment = updateOne(Comment, "comment");

// @desc Get a Single Comment
export const getComment = getOne(Comment, "comment");

// @desc get All Comment
export const allComments = getAll(Comment);

// @desc Delete Comment
export const deleteComment = deleteOne(Comment, "comment");
