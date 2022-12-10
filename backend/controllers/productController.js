import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getAllProducts = asyncHandler(async (req, res, next) => {
  const pro = await Product.find();
  res.json(pro);
});

const getProductDetails = asyncHandler(async (req, res, next) => {
  const proItem = await Product.findById({ _id: req.params.id });
  if (proItem) {
    res.json(proItem);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getAllProducts,getProductDetails };
