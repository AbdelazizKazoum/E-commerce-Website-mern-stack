import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens.js";

//auth user
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      idAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("email or password is incorrect");
  }
});

const test = (req, res) => {
  //   const { email, password } = req.body;

  res.status(200).json({ message: "hello world" });
};

const getUserProfile = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id);

  if (currentUser) {
    res.status(200).json({
      id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      idAdmin: currentUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found !");
  }
});

export { authUser, getUserProfile };
