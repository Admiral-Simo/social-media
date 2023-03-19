import express from "express";
import {getLikes, toggleLike} from "../controllers/like.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", toggleLike);

export default router;
