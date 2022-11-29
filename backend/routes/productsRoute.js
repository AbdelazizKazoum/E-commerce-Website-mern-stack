import express from "express";
import products from "../data/productsList.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json(products);
});

router.get("/:id", (req, res, next) => {
  const product = products.find((p) => (p._id = req.params.id));
  res.status(200).json(product);
});

export default router;
