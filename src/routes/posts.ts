import { NextFunction, Request, Response, Router } from "express";

const router = Router();
let posts = [
  { id: 0, name: "some1" },
  { id: 1, name: "some2" },
  { id: 2, name: "some2" },
];

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  // 쿼리파라미터
  const limit = parseInt(req.query.limit as string);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }

  res.status(200).json(posts);
});

router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
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
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const newPost = {
    id: posts.length + 1,
    name: req.body.name,
  };

  if (!newPost.name) {
    const error = new Error(`Please include a name`) as Error & {
      status: number;
    };
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(200).json(posts);
});

router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found.`) as Error & {
      status: number;
    };
    error.status = 404;
    return next(error);
  }

  post.name = req.body.name;
  res.status(200).json(posts);
});

router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
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
});

export default router;
