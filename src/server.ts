import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import posts from "./routes/posts";
import errorHandler from "./middlewares/error";
import path from "path";
import connectDB from "./config/db";

// 환경설정
dotenv.config();

// 서버
const app = express();
const port = process.env.PORT || 8000;

// 미들웨어
app.use(morgan("dev")); // logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적파일
app.use(express.static(path.join(__dirname, "../public")));

// 라우터
app.use("/api/posts", posts);
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found") as Error & { status: number };
  error.status = 404;
  next(error);
});

// 에러 핸들러
app.use(errorHandler);

// 서버 시작
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDB();
});
