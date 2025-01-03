import { NextFunction, Request, Response } from "express";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    // 인증된 경우 다음 미들웨어로 이동
    console.log(req.method, req.originalUrl, "ensureAuth", "인증된사용자");
    next();
  } else {
    // 인증되지 않은 경우 홈으로 리디렉션
    console.log(req.method, req.originalUrl, "ensureAuth", "인증되지않은사용자");
    res.redirect("/");
  }
};

export const ensureGuest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    // 인증되지 않은 경우 요청 처리 진행
    console.log(req.method, req.originalUrl, "ensureGuest", "인증된사용자");
    next();
  } else {
    // 인증된 경우 대시보드로 리디렉션
    console.log(req.method, req.originalUrl, "ensureGuest", "인증되지않은사용자");
    res.redirect("/dashboard");
  }
};
