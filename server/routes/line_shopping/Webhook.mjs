import express from "express";
import { handleShoppingWebhook } from "../../controllers/line_shopping/WebhookController.mjs";

const router = express.Router();

router.post("/webhook", async (req, res) => {
    await handleShoppingWebhook(req, res);
});


export default router;