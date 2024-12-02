import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found") as Error & { status: number };
  error.status = 404;
  next(error);
};

export default notFound;
