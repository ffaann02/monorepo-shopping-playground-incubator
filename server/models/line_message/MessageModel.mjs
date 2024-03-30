import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function Push_message(userID, message) {
    try {
        const response = await axios.post(
            "https://api.line.me/v2/bot/message/push",
            {
                to: userID,
                messages: [message],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
                },
            }
        );
        // console.log('LINE API Response:', response.data);
        return response;
    } catch (error) {
        // console.error('Error push message to LINE:', error.message);
        throw error;
    }
}