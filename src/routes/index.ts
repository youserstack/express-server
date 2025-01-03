import { Router } from "express";
import posts from "./posts";
import auth from "./auth";
import products from "./products";
import orders from "./orders";

const router = Router();

router.use("/auth", auth);
router.use("/posts", posts);
router.use("/products", products);
router.use("/profile", (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
});
router.use("/orders", orders);

export default router;
