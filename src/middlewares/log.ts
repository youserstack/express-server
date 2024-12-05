import { NextFunction, Request, Response } from "express";

export const logLine = (req: Request, res: Response, next: NextFunction) => {
  console.log();
  next();
};
