import { Router } from "express";
import posts from "./posts";
import auth from "./auth";

const router = Router();

router.use("/posts", posts);
router.use("/auth", auth);

export default router;
