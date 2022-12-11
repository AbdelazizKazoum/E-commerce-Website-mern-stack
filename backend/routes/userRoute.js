import express from "express";
import {
  authUser,
  getUserProfile,
  userRegister,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);

router.route("/").post(userRegister);
router.route("/profile").get(protect, getUserProfile);

export default router;
