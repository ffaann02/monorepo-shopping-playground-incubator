import express from "express"
import { CreateCheckoutLink } from "../../controllers/line_shopping/CheckoutLinkController.mjs";

const router = express.Router();

router.post("/create", async (req, res) => {
    await CreateCheckoutLink(req, res);
});

export default router;