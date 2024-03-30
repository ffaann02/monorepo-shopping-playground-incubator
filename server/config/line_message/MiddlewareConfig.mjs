import dotenv from 'dotenv';
dotenv.config();

export default {
    port: "3000",
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};