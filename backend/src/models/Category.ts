import mongoose from 'mongoose';

export interface CategoryAttributes {
  title: string;
  slug?: string;
  user: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new mongoose.Schema<CategoryAttributes>(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    slug: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
  },
  { timestamps: true }
);

const Category = mongoose.model<CategoryAttributes>("Category", categorySchema);

export default Category;
