import express from "express";
import { checkData } from "../controllers/loginController.js";

const router = express.Router();


router.post("/", checkData);

export default router;