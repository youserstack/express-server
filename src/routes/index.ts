import { Router } from "express";
import posts from "./posts";
import auth from "./auth";
import products from "./products";
import { ensureAuth } from "../middlewares/auth";

const router = Router();

router.use("/auth", auth);
router.use("/posts", posts);
router.use("/products", products);
router.use("/profile", (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
});
router.use("/order", (req, res) => {
  const payload = req.body;
  const user = req.user;
  console.log({ user, payload });
  const order = "준비중...";
  return res.status(200).json({ order });
});

export default router;
