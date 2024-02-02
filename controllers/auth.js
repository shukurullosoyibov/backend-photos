import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

import { createError } from "../utils/errors.js";

const app = express();

// Foydalanuvchilarni olish
const secretKey = "s3cr3t-k3y";
export const register = async (req, res, next) => {
  try {
    const { username, password, isAdmin, firstname, confirmpassword } = req.body;
    console.log(password, isAdmin);
    // Parolni hashlash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      isAdmin,
      firstname,
      password: hashedPassword,
    });

    await newUser.save();
    
    res.status(200).send("successful create user");
  } catch (error) {
    console.error(error);
   
    res.status(500).json({message:error.message});
  }
};

export const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));
  
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));
  
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        "s3cr3t-k3y"
      );
  
      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .status(200)
        .json({ data: { ...otherDetails }, isAdmin, token:token});
    } catch (err) {
      next(err);
    }
  };
