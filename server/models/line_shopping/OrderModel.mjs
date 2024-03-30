import axios from "axios";
import Authorizations from "../../config/line_shopping/authorization.mjs";

const EndpointURL = "https://developers-oaplus.line.biz/myshop/v1/orders";

export const Get_all_orders = async () => {
    try {
        const response = await axios.get(EndpointURL, {
            headers: Authorizations
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Order_detail = async (orderNo) => {
    try {
        const urlWithParams = `${EndpointURL}/${orderNo}`;
        const response = await axios.get(urlWithParams, {
            headers: Authorizations
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Cancel_Order = async (orderNo, remarkCancel) => {
    try {
        const urlWithParams = `${EndpointURL}/${orderNo}/cancel`;
        const response = await axios.put(urlWithParams, remarkCancel, {
            headers: Authorizations
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Mark_as_paid = async (orderNo) => {
    try {
        const urlWithParams = `${EndpointURL}/${orderNo}/mark-as-paid`;
        console.log(urlWithParams);
        const response = await axios.post(urlWithParams, {}, {
            headers: Authorizations
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const Order_messaging = async (orderNo, message) => {
    try {
        const urlWithParams = `${EndpointURL}/${orderNo}/messages/push`;
        const payload = {
            "messages": [message]
        }
        console.log(urlWithParams);
        const response = await axios.post(urlWithParams, payload, {
            headers: Authorizations
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};