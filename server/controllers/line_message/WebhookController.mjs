import crypto from "crypto";
import MiddlewareConfig from "../../config/line_message/MiddlewareConfig.mjs";
import { postToDialogflow } from "../diaglogflow/dialogflowController.mjs";
import { Set_user_database } from "../../models/firebase/FirestoreModel.mjs";

// Condition for  handle each webhook type
export const handleMessageWebhook = async (req, res) => {
    try {
        const requestBody = JSON.stringify(req.body); // Convert request body to string
        const signature = req.headers['x-line-signature']; // Get signature from request headers
        const validate = await validateSignature(requestBody, signature);
        if (validate === true) {
            await Promise.all(
                req.body.events.map(async (event) => {
                    console.log("message webhook: ");
                    console.log(event);
                    if (event.type === 'message' && event.message.type === 'text') {
                        console.log(`type: mesage`);
                        await handleText(req, event);
                    }
                    else if (event.type === 'follow') {
                        console.log(`type: follow`);
                        console.log(event.source);
                        await SetUserDatabase(event.source.userId);
                    }
                })
            );
            res.sendStatus(200);
        } else {
            console.error("Invalid signature");
            res.status(403).send("Invalid signature");
        }
    } catch (error) {
        console.error("Error processing events:", error);
        res.status(500).send("Error processing events");
    }
}

async function handleText(req) {
    return postToDialogflow(req);
}

async function validateSignature(requestBody, signature) {
    const channelSecret = MiddlewareConfig.channelSecret;
    // Generate signature using channel secret and request body
    const generatedSignature = crypto
        .createHmac("SHA256", channelSecret)
        .update(requestBody)
        .digest("base64");
    // Compare generated signature with received signature
    if (signature === generatedSignature) {
        return true;
    }
    else {
        return false;
    }
}

async function SetUserDatabase(userId) {
    try{
      const result = await Set_user_database(userId);
      console.log(result);
      return result;
    } catch(error) {
      return null;
    }
}