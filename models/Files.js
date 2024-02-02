import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    filepath: String,
    title: String,
    description: String,
    category:String,
    categorySlug:String,
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

export default File;
