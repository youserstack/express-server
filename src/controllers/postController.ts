import { NextFunction, Request, Response } from "express";
import Post from "../models/Post";

let posts = [
  { id: 0, title: "some1" },
  { id: 1, title: "some2" },
  { id: 2, title: "some2" },
];

// @desc    Get all posts
// @route   GET /api/posts
export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 쿼리 파라미터로 받은 limit 값 처리
    const limit = parseInt(req.query.limit as string) || 10; // 기본값은 10
    if (isNaN(limit) || limit <= 0) return res.status(400).json({ message: "Invalid limit value" });

    const posts = await Post.find().limit(limit);

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
export const getPost = (req: Request, res: Response, next: NextFunction) => {
  // 파라미터
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found.`) as Error & {
      status: number;
    };
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

// @desc    Create new post
// @route   POST /api/posts
export const createPost = (req: Request, res: Response, next: NextFunction) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  console.log({ body: req.body });

  if (!newPost.title) {
    const error = new Error(`Please include a title`) as Error & {
      status: number;
    };
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(200).json(newPost);
};

// @desc    Update post
// @route   PUT /api/posts/:id
export const updatePost = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found.`) as Error & {
      status: number;
    };
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
export const deletePost = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found.`) as Error & {
      status: number;
    };
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};
