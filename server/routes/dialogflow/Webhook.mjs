import express from "express";
import { handleIntent } from "../../controllers/diaglogflow/IntentController.mjs"; 

const router = express.Router();

router.post("/webhook", async (req, res) => {
    handleIntent(req, res);
});

export default router;