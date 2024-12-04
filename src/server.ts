import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/error";
import path from "path";
import connectDB from "./configs/db";
import notFound from "./middlewares/notFound";
import { engine } from "express-handlebars";
import home from "./routes/index";
import auth from "./routes/auth";
import passport from "passport";
import passportConfig from "./configs/passport";
import session from "express-session";
import { logMiddleware } from "./middlewares/log";
// import posts from "./routes/posts";
// import moment from "moment";

// 환경설정 --------------------
dotenv.config();
passportConfig(passport); // 인증

// 데이터베이스
connectDB();

// 서버
const app = express();
const port = process.env.PORT || 8000;

// 미들웨어 --------------------
if (process.env.NODE_ENV === "development") {
  // morgan 미들웨어 설정
  // 커스텀 토큰 생성 (현재 시간을 yyyy-mm-dd 형식으로 반환)
  // morgan.token("korea-time", () => moment().format("YYYY-MM-DD HH:mm:ss"));
  // app.use(morgan(":korea-time :method :url :status :response-time ms"));
  // app.use(morgan("dev"));
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 세션
app.use(
  session({
    secret: "mySecretKey", // 세션 암호화를 위한 키
    resave: false, // 세션이 수정되지 않아도 항상 저장 여부 // resave: true 는 요청시마다 세션저장한다. 세션이 수정되지 않아도 저장을 한다.
    saveUninitialized: true, // 초기화되지 않은 세션도 저장 여부 // uninitialized 초기화되지않은세션을 저장하는 속성.
    cookie: { secure: false }, // HTTPS에서만 쿠키를 전달하도록 설정
    //     store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
  })
);

// 인증
// passport.js : 세션에 인증 데이터를 저장하고, 필요할 때 복원하여 인증 상태를 유지
app.use(passport.initialize()); // 초기화
app.use(passport.session()); // Passport가 Express 세션과 상호작용하도록 설정

// 정적파일(static html)
app.use(express.static(path.join(__dirname, "../public/css")));

// 템플릿엔진(dynamic html)
// .hbs 확장자를 처리하는 express-handlebars의 템플릿 엔진을 등록
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
// app.engine()에서 등록한 템플릿 엔진의 이름과 일치해야 합니다.
// 템플릿 파일의 기본 확장자를 .hbs로 설정.
// app.engine('hbs', ...)에서 등록된 템플릿 엔진(여기서는 express-handlebars)을 사용하여 .hbs 파일을 렌더링.
app.set("view engine", ".hbs");
app.set("views", "./views");

// 라우터 -----------------------
// app.use("/api/posts", posts);
app.use("/", logMiddleware, home);
app.use("/auth", logMiddleware, auth);

// 에러(미들웨어)
app.use(notFound);
app.use(errorHandler);

// 서버 시작 ---------------------
app.listen(port, async () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`);
});
