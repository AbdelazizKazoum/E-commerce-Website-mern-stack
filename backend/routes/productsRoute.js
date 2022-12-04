import express from "express";
import products from "../data/productsList.js";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// get all products :
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const pro = await Product.find();
    res.json(pro);
  })
);

// Search for Producxt by id :
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const proItem = await Product.findById({ _id: req.params.id });
    if (proItem) {
      res.json(proItem);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
