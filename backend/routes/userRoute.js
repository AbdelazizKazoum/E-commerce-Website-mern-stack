import express from "express";
import {
  authUser,
  getUserProfile,
  userRegister,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);

router.route("/").post(userRegister);

// routes for the profile requests
router.route("/profile").get(protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

export default router;
