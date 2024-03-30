import express from "express"
import {
    AdjustInventory,
    DecreaseInventory,
    IncreaseInventory
} from "../../controllers/line_shopping/InventoryController.mjs";

const router = express.Router();

router.put("/adjust-inventory", async (req, res) => {
    await AdjustInventory(req, res);
});

router.put("/decrease-inventory", async (req, res) => {
    await DecreaseInventory(req, res);
});

router.put("/increase-inventory", async (req, res) => {
    await IncreaseInventory(req, res);
});

export default router;