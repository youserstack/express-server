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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
let posts = [
    { id: 0, title: "some1" },
    { id: 1, title: "some2" },
    { id: 2, title: "some2" },
];
// @desc    Get all posts
// @route   GET /api/posts
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 쿼리파라미터
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
});
exports.getPosts = getPosts;
// @desc    Get single post
// @route   GET /api/posts/:id
const getPost = (req, res, next) => {
    // 파라미터
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found.`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);
};
exports.getPost = getPost;
// @desc    Create new post
// @route   POST /api/posts
const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
    };
    console.log({ body: req.body });
    if (!newPost.title) {
        const error = new Error(`Please include a title`);
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(200).json(newPost);
};
exports.createPost = createPost;
// @desc    Update post
// @route   PUT /api/posts/:id
const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found.`);
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    res.status(200).json(posts);
};
exports.updatePost = updatePost;
// @desc    Delete post
// @route   DELETE /api/posts/:id
const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found.`);
        error.status = 404;
        return next(error);
    }
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(posts);
};
exports.deletePost = deletePost;
