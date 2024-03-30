import express from "express";
import { handleMessageWebhook } from "../../controllers/line_message/WebhookController.mjs"; 

const router = express.Router();

router.post("/webhook", async (req, res) => {
    await handleMessageWebhook(req, res);
});

export default router;