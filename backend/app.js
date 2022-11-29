import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/productsRoute.js";
import mongoose from "mongoose";
import connectDb from "./config/db.js";

const app = express();

app.use(express.json());

dotenv.config();

connectDb();

app.use("/api/products", productsRouter);

export default app;
