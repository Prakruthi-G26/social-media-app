import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import authOwner from "../middleware/authowner.js";
import { createPost, editPost, deletePost, allPosts, toggleLike, createComment, myPosts } from "../controllers/postControllers.js";
import Post from "../models/postmodel.js";

const postRouter = express.Router();

postRouter.post('/posts', verifyToken, createPost);
postRouter.put('/posts/:id', verifyToken, authOwner, editPost);
postRouter.delete('/posts/:id', verifyToken, authOwner, deletePost);
postRouter.get('/posts', allPosts);
postRouter.get('/myposts', verifyToken, myPosts);
postRouter.put('/posts/:id/like', verifyToken, toggleLike);
postRouter.post('/posts/:id/comment',verifyToken, createComment);
export default postRouter;