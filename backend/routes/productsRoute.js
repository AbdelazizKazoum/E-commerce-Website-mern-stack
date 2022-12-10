import express from "express";
import {
  getAllProducts,
  getProductDetails,
} from "../controllers/productController.js";

const router = express.Router();

// get all products :
router.get("/", getAllProducts);

// Search for Producxt by id :
router.get("/:id", getProductDetails);

export default router;
