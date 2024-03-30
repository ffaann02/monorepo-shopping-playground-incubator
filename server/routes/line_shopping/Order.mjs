import express from "express"
import {
    GetAllOrders,
    OrderDetail,
    CancelOrder,
    MarkAsPaid,
    OrderMessaging
} from "../../controllers/line_shopping/OrderController.mjs";

const router = express.Router();

// LINE SHOPPING API --------------------------------------------------------------------

router.get("/get-all-orders", async (req, res) => {
    await GetAllOrders(req, res);
});

router.get("/order-detail", async (req, res) => {
    await OrderDetail(req, res);
});

router.put("/cancel-order", async (req, res) => {
    await CancelOrder(req, res);
});

// Only work with (COD -> Cash on Delivery)
router.post("/mark-as-paid", async (req, res) => {
    await MarkAsPaid(req, res);
});

// LINE SHOPPING API (External document)--------------------------------------------------------------------

// Send message with orderId
router.post("/order-messaging", async (req, res) => {
    await OrderMessaging(req, res);
});

export default router;