import express from "express";
import {
  createOrder,
  getOrders,
  getOrderDetails,
  orderPay,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/myorders").get(protect, getOrders);

router.get("/:id", protect, getOrderDetails);
router.route("/:id/pay").put(protect, orderPay);

export default router;
