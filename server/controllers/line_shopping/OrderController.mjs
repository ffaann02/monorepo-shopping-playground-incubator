import {
    Get_all_orders,
    Order_detail,
    Cancel_Order,
    Mark_as_paid,
    Order_messaging
} from "../../models/line_shopping/OrderModel.mjs";

export const GetAllOrders = async (req, res) => {
    try {
        const result = await Get_all_orders();
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error get all orders: ${error}` });
        console.log("Response status: " + error.response.status);
        console.log(error.response.data);
    }
};

export const OrderDetail = async (req, res) => {
    const orderNo = req.body.orderNo;
    try {
        const result = await Order_detail(orderNo);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error order detail: ${error}` });
        console.log("Response status: " + error.response.status);
        console.log(error.response.data);
    }
};

export const CancelOrder = async (req, res) => {
    const orderNo = req.body.orderNo;
    const remarkCancel = req.body.payload;
    try {
        const result = await Cancel_Order(orderNo, remarkCancel);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error cancle order: ${error}` });
        console.log("Response status: " + error.response.status);
        console.log(error.response.data);
    }
};

export const MarkAsPaid = async (req, res) => {
    const orderNo = req.body.orderNo;
    console.log(orderNo);
    try {
        const result = await Mark_as_paid(orderNo);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error mark as paid: ${error}` });
        console.log("Response status: " + error.response.status);
        console.log(error.response.data);
    }
};

export const OrderMessaging = async (req, res) => {
    const orderNo = req.body.orderNo;
    const messages = req.body.messages;
    console.log(orderNo);
    console.log(messages);
    try {
        const result = await Order_messaging(orderNo, messages);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: `Error order messaging: ${error}` });
        console.log("Response status: " + error.response.status);
        console.log(error.response.data);
    }
};