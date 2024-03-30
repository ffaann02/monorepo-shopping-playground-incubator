import { geminiTextAndImageProcessing } from "../../models/gemini/geminiModel.mjs";

const keyMap = {
    "Coupon code": "code",
    "Coupon type": "type",
    "Discount value": "value",
    "Start Date": "startDate",
    "End Date": "endDate",
    "Coupon quantity": "quantity",
    "Limit per user": "limitPerUser",
    "Minimum purchase quantity (items)": "minPurchaseQuantity",
    "Terms & Conditions": "termsAndConditions"
};

export async function geminiImageVision(req, res) {
    try {
        const prompt = "I want to read text on this image to make an autofill function. Give me key and value for each field in JSON object." +
            "Don't give me  ```json{}``` I want only {}";
        const imageBase64 = req.body.imageBase64;
        const result = await geminiTextAndImageProcessing(prompt, imageBase64);
        console.log(result);
        const data = await JSON.parse(result);
        // Create a new object with renamed keys
        const newData = {};
        for (const [oldKey, value] of Object.entries(data)) {
            const newKey = keyMap[oldKey] || oldKey;
            if (newKey === 'value') {
                newData[newKey] = parseFloat(value);
            } else if (newKey === 'quantity') {
                newData[newKey] = parseInt(value.replace(/,/g, ''), 10);
            } else {
                newData[newKey] = value;
            }
        }
        res.json(newData);
    } catch (error) {
        res.status(500).json({ error: `Error gemini image vision: ${error}` });
        console.log(error);
    }
}