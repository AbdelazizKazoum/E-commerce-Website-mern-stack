const express = require("express");
const products = require("./productsList");
const productsRouter = require("./routes/productsRoute");

const app = express();

app.use("/api/products", productsRouter);


module.exports = app;
