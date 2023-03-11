import mongoose from 'mongoose';

export interface CommentAttributes {
  user: any;
  post: mongoose.Schema.Types.ObjectId;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema = new mongoose.Schema<CommentAttributes>(
  {
    user: {
      type: Object,
      required: [true, "User is required"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    description: {
      type: String,
      required: [true, "Comment description is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<CommentAttributes>("Comment", commentSchema);

export default Comment;
