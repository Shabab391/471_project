import express from "express";
import { getCoordinates } from "../controllers/locationController.js";

const router = express.Router();

router.get("/", getCoordinates);

export default router;
