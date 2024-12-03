import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGODB_URI as string;

  if (!uri) {
    console.error("MongoDB URI가 설정되지 않았습니다.");
    throw new Error("MongoDB URI is not defined in the environment variables.");
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(uri);
      console.log("MongoDB 연결 성공");
      return;
    } catch (err) {
      console.error("MongoDB 연결 실패:", err);
      throw err; // 에러를 상위로 전달
    }
  }

  console.log("MongoDB가 이미 연결되어 있습니다.");
}

export default connectDB;
