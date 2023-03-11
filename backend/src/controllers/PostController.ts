import express, { Request, Response, NextFunction } from "express";
import Post from "../models/Post";
import User from "../models/User";
import { apiError } from "../utils/apiError";
import { JwtPayload } from "jsonwebtoken";

export const createPost = async (req: JwtPayload, res: Response) => {
  // Create The Post
  req.body.author = req.user._id;
  const post = await Post.create(req.body);

  // Associate user to post
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { posts: post._id },
    },
    { new: true }
  );

  res.status(201).send({ data: post });
};

// @desc Update Post
export const updatePost = async (req:JwtPayload, res:Response, next:NextFunction) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return next(new apiError(`No Post for this id ${id}`, 400));
  }

  // Check if The Post Belong To User
  if (post.author.toString() !== req.user._id.toString()) {
    return next(new apiError(`You are not allowed to update this post`, 403));
  }

  const doc = await Post.findOneAndUpdate(post._id, req.body, { new: true });

  res.status(200).json({ data: doc });
};

// @desc Get List of Posts
export const allPosts = async (req: JwtPayload, res: Response) => {
    try {
      const posts = await Post.find().populate("author");
      res.status(200).json({ size: posts.length, data: posts });
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch posts" });
    }
  };
  

// @desc Get a single post
export const getPost = (async (req:JwtPayload, res:Response, next:NextFunction) => {
  const post = await Post.findById(req.params.id).populate("author");

  if (!post) {
    return next(new apiError(`No post for this id ${req.params.id}`, 404));
  }

//   if (post.author.blocked.includes(req.user._id)) {
//     return next(
//       new apiError(`Sorry, You Are Not Allowed to Access This Post`, 403)
//     );
//   }

  res.send(post);
});

// @desc Delete Post
export const deletePost = async (req:JwtPayload, res:Response, next:NextFunction) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(new apiError(`No Post for this id ${id}`, 400));
  }

  // Check if The Post Belong To User
  if (post.author.toString() !== req.user._id.toString()) {
    return next(new apiError(`You are not allowed to delete this post`, 403));
  }

  await Post.findByIdAndDelete(id);

  //
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { posts: post._id },
    },
    { new: true }
  );

  res.status(204).json({message: "post deleted successfully"});
};
