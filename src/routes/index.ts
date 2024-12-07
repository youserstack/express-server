import { Router } from "express";
import posts from "./posts";
import auth from "./auth";
import products from "./products";

const router = Router();

router.use("/auth", auth);
router.use("/posts", posts);
router.use("/products", products);

export default router;
