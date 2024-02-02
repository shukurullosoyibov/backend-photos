import mongoose from "mongoose";

// Define a schema for each social link
const SocialLinkSchema = new mongoose.Schema({
  title: String,
  link: String,
});

// Define the main footer schema
const FooterSchema = new mongoose.Schema(
  {
    brand: {
      title: String,
      link: String,
    },
    description: String,
    socialLink: [SocialLinkSchema], // Array of objects with title and link properties
    copy: {
      title: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model based on the FooterSchema
export default mongoose.model("Footer", FooterSchema);
