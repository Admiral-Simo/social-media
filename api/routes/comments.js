import express from "express";
import {
  getComments,
  addComment,
  getCommenters,
  deleteComment,
  updateComment,
  editedCount,
} from "../controllers/comment.js";

const router = express.Router();

router.get("/", getComments);
router.get("/commenters", getCommenters);
router.get("/isEdited/:id", editedCount);
router.delete("/", deleteComment);
router.put("/", updateComment);
router.post("/", addComment);

export default router;
