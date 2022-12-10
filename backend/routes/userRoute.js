import express from "express";
import { authUser, test } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/auth", authUser);

router.get("/test", test);

export default router;
