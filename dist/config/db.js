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
const mongoose_1 = __importDefault(require("mongoose"));
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MongoDB URI가 설정되지 않았습니다.");
            throw new Error("MongoDB URI is not defined in the environment variables.");
        }
        if (mongoose_1.default.connection.readyState === 0) {
            try {
                yield mongoose_1.default.connect(uri);
                console.log("MongoDB 연결 성공");
                return;
            }
            catch (err) {
                console.error("MongoDB 연결 실패:", err);
                throw err; // 에러를 상위로 전달
            }
        }
        console.log("MongoDB가 이미 연결되어 있습니다.");
    });
}
exports.default = connectDB;
