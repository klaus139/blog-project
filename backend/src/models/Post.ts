import mongoose from "mongoose";

export interface PostAttributes {
  title: string;
  body: string;
  image?: string;
  author: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  file?: string;
  tags?: mongoose.Schema.Types.ObjectId[];
  comments?: mongoose.Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema = new mongoose.Schema<PostAttributes>(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "post category is required"],
    },
    file: {
      type: String,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model<PostAttributes>("Post", PostSchema);

export default Post;
