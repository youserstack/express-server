import { Router } from "express";
import { ensureAuth } from "../middlewares/auth";

const router = Router();

router.post("/", ensureAuth, (req, res) => {
  const payload = req.body;
  const user = req.user;
  console.log({ user, payload });
  const order = "준비중...";
  return res.status(200).json({ order });
});

export default router;
