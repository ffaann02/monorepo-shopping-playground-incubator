import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import productRoute from "./routes/line_shopping/Product.mjs"
import checkoutLinkRoute from "./routes/line_shopping/CheckoutLink.mjs"
import orderRoute from "./routes/line_shopping/Order.mjs"
import inventoryRoute from "./routes/line_shopping/Inventory.mjs"
import lineShoppingWebhook from "./routes/line_shopping/Webhook.mjs";
import lineMessageWebhook from "./routes/line_message/Webhook.mjs"
import dialogflowWebhook from "./routes/dialogflow/Webhook.mjs"; 
import firebaseRoute from "./routes/firebase/Firebase.mjs";
import mysqlRoute from "./routes/mySql/MySql.mjs";
import setupSocketRoutes from "./routes/socket/Socket.mjs"
import geminiRoute from "./routes/gemini/gemini.mjs";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Configuration for cors
const corsOptions = {
  origin: "*", // Allow for all domains
  credentials: true,
};
app.use(cors(corsOptions));

// Create HTTP server instance
const server = http.createServer(app);
// Create Socket.IO server instance
const io = new Server(server, {
  cors: {
    origin: ["https://line-shopping-clone.vercel.app", 
             "https://liff.line.me/2004157881-L1zldWyb", 
             "http://localhost:5173", 
             "http://localhost:5174",
             "https://line-shopping-dashboard.vercel.app"],
    credentials: true,
    methods: ["GET", "POST"],
    wssEngine: ['ws','wss'],
    transports: ['websocket', 'polling', 'flashsocket']
  },
});

// For read request body from postman
// 10mb limit for request body size(use for imageBase64)
app.use(express.json({ limit: '10mb' }));

// LINE Shopping API
app.use("/product", productRoute);
app.use("/inventory", inventoryRoute);
app.use("/order", orderRoute);
app.use("/checkout-link", checkoutLinkRoute);

// LINE Shopping Webhook
app.use("/myshop", lineShoppingWebhook);

// LINE Messaging Webhook
app.use("/message", lineMessageWebhook);

// Dialogflow Fulfillment Webhook
app.use("/fulfillment", dialogflowWebhook);

// MySQL 
app.use("/mysql", mysqlRoute);

// Firebase
app.use("/firebase", firebaseRoute);

app.use("/gemini", geminiRoute);

// Socket.IO
setupSocketRoutes(io);

// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });

// Start listening
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});