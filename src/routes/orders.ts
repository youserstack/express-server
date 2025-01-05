import { Router } from "express";
import { ensureAuth } from "../middlewares/auth";
import { createOrder, getOrders } from "../controllers/orderController";

const router = Router();

router.post("/", ensureAuth, createOrder);
router.get("/", ensureAuth, getOrders);

export default router;
