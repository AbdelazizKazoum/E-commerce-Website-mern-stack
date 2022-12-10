import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRETEKEY);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("token failed !! ");
    }
  } else {
    console.log("token failed");
    res.status(401);
    throw new Error("not authorized !!");
  }
});

export { protect };
