import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User 스키마와 연결
      required: true,
    },

    tags: [String], // 배열 형태의 문자열로 태그 저장
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Comment 스키마와 연결
      },
    ],
    image: {
      type: String,
    },
    views: {
      type: Number,
      default: 0, // 기본값 0으로 설정
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
