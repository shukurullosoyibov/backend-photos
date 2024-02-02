import mongoose from "mongoose";

const ourInstagramSchema = new mongoose.Schema(
  {
    filename: String,
    filepath: String,
    title: String,
    description: String,
    link: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ourInstagram", ourInstagramSchema);
