const express = require("express");
const products = require("../productsList");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json(products);
});

router.get("/:id", (req, res, next) => {
    const product = products.find((p) => p._id = req.params.id);
  res.status(200).json(product);
});

module.exports = router;
