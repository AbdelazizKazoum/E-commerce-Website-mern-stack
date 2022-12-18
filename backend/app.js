import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/productsRoute.js";
import userRouter from "./routes/userRoute.js";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(
  cors({
    orogin: "http://localhost:3000/",
  })
);

app.use(express.json());

connectDb();

// Product Routes call
app.use("/api/products", productsRouter);

//Users Routes call
app.use("/api/users", userRouter);

app.use(notFound);

app.use(errorHandler);

export default app;
