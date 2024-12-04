import { NextFunction, Request, Response } from "express";

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    console.log(req.method, req.url, "인증된 사용자에게 접근가능한 페이지");
    next(); // 인증된 경우 다음 미들웨어로 이동
  } else {
    console.log(req.method, req.url, "미인증된 사용자에게 홈페이지로 리다이렉션...");
    res.redirect("/"); // 인증되지 않은 경우 홈으로 리디렉션
  }
};

export const ensureGuest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    console.log(req.method, req.url, "미인증된 사용자에게 접근가능한 페이지");
    next(); // 인증되지 않은 경우 요청 처리 진행
  } else {
    console.log(req.method, req.url, "인증된 사용자에게 대시보드페이지로 리다이렉션...");
    res.redirect("/dashboard"); // 인증된 경우 대시보드로 리디렉션
  }
};
