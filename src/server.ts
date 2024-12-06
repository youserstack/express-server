import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import errorHandler from "./middlewares/error";
import connectDB from "./configs/db";
import notFound from "./middlewares/notFound";
import passport from "passport";
import passportConfig from "./configs/passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./routes";

// 환경설정
{
  dotenv.config();

  // 인증
  passportConfig(passport);

  // 데이터베이스
  connectDB();
}

// 서버생성
const app = express();
const port = process.env.PORT || 8000;

// 미들웨어
{
  // 로깅
  if (process.env.NODE_ENV === "development") {
    // morgan 미들웨어 설정
    // 커스텀 토큰 생성 (현재 시간을 yyyy-mm-dd 형식으로 반환)
    // morgan.token("korea-time", () => moment().format("YYYY-MM-DD HH:mm:ss"));
    // app.use(morgan(":korea-time :method :url :status :response-time ms"));
    // app.use(morgan("dev"));
    app.use(morgan("dev"));
  }

  // 파싱
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 세션
  app.use(
    session({
      secret: "mySecretKey", // 세션 암호화를 위한 키
      resave: false, // false: 세션이 수정되지 않아도 항상 저장하지 않겠다. 다시말해서, 세션이 수정되면 저장하겠다. // resave: true 는 요청시마다 세션저장한다. 세션이 수정되지 않아도 저장을 한다.
      saveUninitialized: false, // 초기화되지 않은 세션도 저장 여부
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
  );

  // 인증
  // passport.js : 세션에 인증 데이터를 저장하고, 필요할 때 복원하여 인증 상태를 유지
  app.use(passport.initialize()); // 초기화
  app.use(passport.session()); // Passport가 Express 세션과 상호작용하도록 설정
}

// 라우터(미들웨어)
app.use("/api", router);

// 에러(미들웨어)
app.use(notFound);
app.use(errorHandler);

// 서버 시작
app.listen(port, async () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`);
});
