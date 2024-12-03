import { Router } from "express";

const router = Router();

// @desc    Login/Landing page
// @route   GET /
router.get("/", (req, res) => {
  res.render("login", { layout: "login" }); // views/login.hbs 라는 파일의 이름
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard"); // views/dashboard.hbs 라는 파일의 이름
});

export default router;
