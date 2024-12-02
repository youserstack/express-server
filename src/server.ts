import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import posts from "./routes/posts";
import errorHandler from "./middlewares/error";
// import path from "path";
import connectDB from "./config/db";
import notFound from "./middlewares/notFound";
import { engine } from "express-handlebars";

// 환경설정
dotenv.config();

// 서버
const app = express();
const port = process.env.PORT || 8000;

// 미들웨어
app.use(morgan("dev")); // logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// 정적파일
// app.use(express.static(path.join(__dirname, "../public")));

// 라우터
app.use("/api/posts", posts);

// 에러 핸들러
app.use(notFound);
app.use(errorHandler);

// 서버 시작
app.listen(port, async () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`);
  await connectDB();
});
