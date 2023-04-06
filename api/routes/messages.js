import express from "express";
import { getMessages } from "../controllers/message.js";

const router = express.Router();

router.get("/:receiverid", getMessages);

export default router;
