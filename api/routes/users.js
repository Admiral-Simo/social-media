import express from "express";
import { getUser, updateUser, getFollowedUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.get("/followed", getFollowedUsers);
router.put("/", updateUser);

export default router;
