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
  const cookies = req.cookies;
  const session = req.session;
  console.log({ user, cookies, session });
  return res.status(200).json({ profile: "profile", user });
});

export default router;
