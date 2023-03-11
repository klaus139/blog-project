import mongoose from "mongoose";

export interface UserAttributes {
   
  phone: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  role: string;
}

const userSchema = new mongoose.Schema(
  {
    
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    image: {
        type: String
    },

    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
  
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
    
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["user", "admin"],
      default: "user",
    },
    salt: {
        type: String
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
