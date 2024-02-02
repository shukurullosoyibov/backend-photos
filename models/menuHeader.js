import mongoose from "mongoose";

const HeaderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    contact: [Object],
   
    call: [Object],
    filename: String,
    filepath: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("HeaderMenu", HeaderSchema);
