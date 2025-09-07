import express from "express";
import { createData } from "../controllers/searchController.js";

const router = express.Router();

// router.get("/", getData);
router.post("/", createData);

export default router;