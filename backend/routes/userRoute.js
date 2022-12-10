import express from "express";
import { authUser, getUserProfile } from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);

router.route("/profile").get(protect, getUserProfile);

export default router;
