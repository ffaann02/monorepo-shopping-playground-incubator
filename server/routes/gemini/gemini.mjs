import express from "express";
import { geminiImageVision } from "../../controllers/gemini/GeminiFunction.mjs";

const router = express.Router();

router.post("/image-vision", async (req, res) => {
    await geminiImageVision(req, res);
});

export default router;