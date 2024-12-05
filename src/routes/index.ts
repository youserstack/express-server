import { Router } from "express";
import { ensureAuth, ensureGuest } from "../middlewares/auth";
import Story from "../models/Story";

const router = Router();

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" }); // views/login.hbs 라는 파일의 이름
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req: any, res) => {
  try {
    const stories = await Story.find({ user: req.user?.id.toString() })
      // lean 메서드는 document가 아니라 plan object를 리턴한다.
      .lean();
    res.render("dashboard", {
      name: req.user?.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

export default router;
