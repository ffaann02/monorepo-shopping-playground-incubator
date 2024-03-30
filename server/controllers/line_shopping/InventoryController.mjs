import {
    Adjust_inventory,
    Decrease_inventory,
    Increase_inventory
} from "../../models/line_shopping/InventoryModel.mjs"

export const AdjustInventory = async (req, res) => {
    const inventoryID = req.body.inventoryID;
    const adjustData = req.body.adjustData;
    try {
        const result = await Adjust_inventory(inventoryID, adjustData);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error adjust inventory: ${error}` });
        console.log("Response status: " + error.response.status);
        console.log(error.response.data);
    }
};

export const DecreaseInventory = async (req, res) => {
    const inventoryID = req.body.inventoryID;
    const adjustData = req.body.adjustData;
    try {
        const result = await Decrease_inventory(inventoryID, adjustData);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error adjust inventory: ${error}` });
        console.log("Response status: " + error.response.status);
        console.log(error.response.data);
    }
};

export const IncreaseInventory = async (req, res) => {
    const inventoryID = req.body.inventoryID;
    const adjustData = req.body.adjustData;
    try {
        const result = await Increase_inventory(inventoryID, adjustData);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error adjust inventory: ${error}` });
        console.log("Response status: " + error.response.status);
        console.log(error.response.data);
    }
};