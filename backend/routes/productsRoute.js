import express from "express";
import products from "../data/productsList.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  Product.find()
    .then((pro) => {
      res.status(200).json(pro);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

router.get("/:id", (req, res, next) => {
  Product.findById({ _id: req.params.id })
    .then((proItem) => {
      res.status(200).json(proItem);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

export default router;
