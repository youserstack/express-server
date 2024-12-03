"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
// Get all posts
router.get("/", postController_1.getPosts);
// Get single post
router.get("/:id", postController_1.getPost);
// Create new post
router.post("/", postController_1.createPost);
// Update post
router.put("/:id", postController_1.updatePost);
// Delete post
router.delete("/:id", postController_1.deletePost);
exports.default = router;
