import { NextFunction, Request, Response } from "express";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    console.log(req.method, req.originalUrl, "ensureAuthMiddleware", "authenticated user");
    next(); // 인증된 경우 다음 미들웨어로 이동
  } else {
    console.log(
      req.method,
      req.originalUrl,
      "authMiddleware",
      "redirecting unauthenticated user..."
    );
    res.redirect("/"); // 인증되지 않은 경우 홈으로 리디렉션
  }
};

export const ensureGuest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    console.log(req.method, req.originalUrl, "ensureGuestMiddleware", "unauthenticated user");
    next(); // 인증되지 않은 경우 요청 처리 진행
  } else {
    console.log(req.method, req.originalUrl, "authMiddleware", "redirecting authenticated user...");
    res.redirect("/dashboard"); // 인증된 경우 대시보드로 리디렉션
  }
};
