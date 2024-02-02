import mongoose from "mongoose";

const HeaderSchema = new mongoose.Schema(
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

export default mongoose.model("header", HeaderSchema);
