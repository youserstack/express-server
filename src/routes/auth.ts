import { Router } from "express";
import passport from "passport";

const router = Router();

// Google 로그인 라우트
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Naver 로그인 라우트
router.get(
  "/naver",
  // passport.authenticate("naver", { scope: ["profile", "email"] })
  passport.authenticate("naver", { scope: ["profile", "email"], state: "hamburger" })
);

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
    // const redirectUrl = `${req.protocol}://${req.get("host")}`;
    // console.log("redirectUrl", redirectUrl);
    // res.redirect(redirectUrl);
    // res.redirect("/");
    res.redirect("https://genzaro.vercel.app");
    // res.redirect("http://localhost:3000");
  }
);

// Logout user
// router.get("/logout", (req, res, next) => {
//   req.logout((error) => {
//     if (error) return next(error);
//     // res.redirect("http://localhost:3000/api/logout"); // next-server(reverse-proxy)으로 리다이렉트
//   });
//   req.session.destroy((err) => {
//     console.log({ err });
//     // res.clearCookie("connect.sid"); // 세션 쿠키 삭제
//     // res.redirect("/");
//   });

//   res.redirect("http://localhost:3000/api/logout"); // next-server(reverse-proxy)으로 리다이렉트

//   console.log("서버에서 로그아웃처리했습니다.");
// });

router.get("/logout", (req, res, next) => {
  // 1. Passport 로그아웃 처리
  req.logout((error) => {
    if (error) return next(error);

    // 2. 세션 삭제
    req.session.destroy((err) => {
      if (err) {
        console.error("세션 삭제 중 오류 발생:", err);
        return next(err);
      }

      // 3. 세션 쿠키 삭제
      res.clearCookie("connect.sid"); // 세션 쿠키 키 이름은 설정에 따라 다를 수 있음
      res.end();
      console.log("로그아웃이 처리되었습니다.");
    });
  });
});

export default router;
