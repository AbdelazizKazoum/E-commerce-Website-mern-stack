import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/productsRoute.js";
import mongoose from "mongoose";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

dotenv.config();

app.use(express.json());

connectDb();

app.use("/api/products", productsRouter);

app.use(notFound);

app.use(errorHandler);

export default app;
