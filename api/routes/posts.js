import express from "express";
import { getPosts, addPost, deletePost, updatePost, editedCount } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/isEdited/:id", editedCount);
router.post("/", addPost);
router.put("/", updatePost);
router.delete("/", deletePost);

export default router;
