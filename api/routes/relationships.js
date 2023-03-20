import express from "express";
import {getRelationships, toggleRelationship} from "../controllers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.post("/", toggleRelationship);

export default router;
