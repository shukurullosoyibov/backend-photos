// models/user.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  status:{
    type:Boolean,
    default: true,
  },
  lastImageCreatedAt: {
    type: Date,
  },
},{
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
