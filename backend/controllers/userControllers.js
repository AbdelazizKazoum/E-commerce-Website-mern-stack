import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      idAdmin: user.isAdmin,
      token: null,
    });
  } else {
    throw new Error("email or password is incorrect");
  }
});

const test = (req, res) => {
  //   const { email, password } = req.body;

  res.status(200).json({ message: "hello world" });
};

export { authUser, test };
