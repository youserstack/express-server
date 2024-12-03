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
import posts from "./routes/posts";
import auth from "./routes/auth";
import passport from "passport";
import passportConfig from "./configs/passport";
import session from "express-session";

// 환경설정
dotenv.config();
passportConfig(passport); // 인증

// 서버
const app = express();
const port = process.env.PORT || 8000;

// 미들웨어
app.use(morgan("dev")); // logger
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handlebars 템플릿 엔진
// .hbs 확장자를 처리하는 express-handlebars의 템플릿 엔진을 등록
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
// app.engine()에서 등록한 템플릿 엔진의 이름과 일치해야 합니다.
// 템플릿 파일의 기본 확장자를 .hbs로 설정.
// app.engine('hbs', ...)에서 등록된 템플릿 엔진(여기서는 express-handlebars)을 사용하여 .hbs 파일을 렌더링.
app.set("view engine", ".hbs");
app.set("views", "./views");

// 세션
app.use(
  session({
    secret: "mySecretKey", // 세션 암호화를 위한 키
    resave: false, // 세션이 수정되지 않아도 항상 저장 여부 // resave: true 는 요청시마다 세션저장한다. 세션이 수정되지 않아도 저장을 한다.
    saveUninitialized: true, // 초기화되지 않은 세션도 저장 여부 // uninitialized 초기화되지않은세션을 저장하는 속성.
    cookie: { secure: false }, // HTTPS에서만 쿠키를 전달하도록 설정
  })
);
// app.use(
//   session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
//   })
// )

// passport 인증 미들웨어
app.use(passport.initialize());
app.use(passport.session());

// 정적파일
app.use(express.static(path.join(__dirname, "../public/css")));

// 라우터
app.use("/", home);
app.use("/auth", auth);
// app.use("/api/posts", posts);

// 에러 핸들러
app.use(notFound);
app.use(errorHandler);

// 서버 시작
app.listen(port, async () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`);
  await connectDB();
});
