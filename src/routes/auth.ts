import { Router } from "express";
import passport from "passport";

const router = Router();

// Google 로그인 라우트
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Naver 로그인 라우트
router.get("/naver", passport.authenticate("naver", { scope: ["profile", "email"] }));

// Google 인증 후 콜백 처리
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Naver 인증 후 콜백 처리
router.get(
  "/naver/callback",
  passport.authenticate("naver", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Logout user
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
    res.redirect("/");
  });
});

export default router;
