import express from "express";
import {
  createOrder,
  getOrderDetails,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);

router.get("/:id", protect, getOrderDetails);

export default router;
