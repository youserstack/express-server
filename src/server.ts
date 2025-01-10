import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import errorHandler from "./middlewares/error";
import connectDB from "./configs/db"; // DB 연결은 여전히 필요할 수 있습니다.
import notFound from "./middlewares/notFound";
import cors from "cors";
import routes from "./routes";
import session from "express-session";
import passport from "passport";
import passportConfig from "./configs/passport";
import MongoStore from "connect-mongo";

// 환경설정
dotenv.config();
connectDB(); // 데이터베이스
passportConfig(passport); // 인증

// 서버 생성
const app = express();
const port: number = Number(process.env.PORT) || 8000;
const sessionCookieSecret = process.env.SESSION_SECRET || "temp";

// 미들웨어
{
  // Reverse Proxy 환경에서 Express가 HTTPS를 신뢰하도록 설정
  // app.set("trust proxy", true);
  app.enable("trust proxy");

  // 로깅
  app.use(morgan("dev"));

  // 파싱
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // cors
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://nid.naver.com",
        "https://genzaro.vercel.app",
        "http://genzaro.vercel.app",
        "https://genzaro-youserstacks-projects.vercel.app",
        "http://genzaro-youserstacks-projects.vercel.app",
      ], // 허용할 도메인 추가
      methods: ["GET", "POST"],
      credentials: true, // 쿠키나 인증 정보를 함께 보내려면 true로 설정
    })
  );

  app.use((req, res, next) => {
    console.log("X-Forwarded-Host:", req.headers["x-forwarded-host"]);
    console.log("X-Forwarded-Proto:", req.headers["x-forwarded-proto"]);
    console.log("Request Host:", req.headers.host); // 요청의 Host 헤더 값 출력
    console.log("Request URL:", req.url); // 요청 URL을 출력
    next();
  });

  // 세션과 초기화
  app.use(
    session({
      secret: sessionCookieSecret, // 세션 암호화를 위한 키
      resave: false, // false: 세션이 수정되지 않으면 항상 저장하지 않겠다. 다시말해서, 세션이 수정되면 저장하겠다. // resave: true 는 요청시마다 세션저장한다. 세션이 수정되지 않아도 저장을 한다.
      saveUninitialized: false, // 초기화되지 않은 세션도 저장 여부
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS에서만 쿠키 전송
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 2, // 2시간 (밀리초 단위)
        // sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // CSRF 방지
      },
    })
  );
  app.use(passport.initialize()); // 초기화
  app.use(passport.session()); // 세션유지
}

// 라우터(미들웨어)
app.use("/api", routes);

// 에러(미들웨어)
app.use(notFound);
app.use(errorHandler);

// 서버 시작
app.listen(port, "0.0.0.0", async () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`);
});
// app.listen(port, async () => {
//   console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`);
// });

export default app;
