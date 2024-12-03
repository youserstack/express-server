"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const posts_1 = __importDefault(require("./routes/posts"));
const error_1 = __importDefault(require("./middlewares/error"));
// import path from "path";
const db_1 = __importDefault(require("./config/db"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const express_handlebars_1 = require("express-handlebars");
// 환경설정
dotenv_1.default.config();
// 서버
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// 미들웨어
app.use((0, morgan_1.default)("dev")); // logger
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.engine("handlebars", (0, express_handlebars_1.engine)());
app.set("view engine", "handlebars");
app.set("views", "./views");
// 정적파일
// app.use(express.static(path.join(__dirname, "../public")));
// 라우터
app.use("/api/posts", posts_1.default);
// 에러 핸들러
app.use(notFound_1.default);
app.use(error_1.default);
// 서버 시작
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${port}`);
    yield (0, db_1.default)();
}));
