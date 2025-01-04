import { Router } from "express";
import { ensureAuth } from "../middlewares/auth";
import { createOrder } from "../controllers/orderController";

const router = Router();

router.post("/", ensureAuth, createOrder);

export default router;
