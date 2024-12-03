import { Router } from "express";
import passport from "passport";

const router = Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  //   성공하면 콜백실행
  (req, res) => {
    res.redirect("/dashboard");
  }
);

export default router;
