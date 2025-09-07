import express from "express";
import { updateInfo, getUserInfo } from "../controllers/profileController.js";
import multer from "multer";

const router = express.Router();

// Use memoryStorage to keep files in memory (no local disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Allow multiple files (sscFile, hscFile, uniFile, profileImage)
router.post(
  "/update-info",
  upload.fields([
    { name: "sscFile", maxCount: 1 },
    { name: "hscFile", maxCount: 1 },
    { name: "uniFile", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  updateInfo
);
router.get("/get-info/:email", getUserInfo);
export default router;

