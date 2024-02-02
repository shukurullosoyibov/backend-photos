import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    filename: String,
    filepath: String,
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    featured:{
        type: Boolean,
        default: false,
    },
    icons:String,
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("category", categorySchema);
