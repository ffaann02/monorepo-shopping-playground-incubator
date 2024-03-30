import axios from "axios";
import Authorizations from "../../config/line_shopping/authorization.mjs";

const EndpointURL = "https://developers-oaplus.line.biz/myshop/v1/inventory";

export const Adjust_inventory = async (inventoryID, amount) => {
    try {
        const urlWithParams = `${EndpointURL}/${inventoryID}/adjust`;
        const response = await axios.put(urlWithParams, amount, {
            headers: Authorizations
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Decrease_inventory = async (inventoryID, amount) => {
    try {
        const urlWithParams = `${EndpointURL}/${inventoryID}/decrease`;
        const response = await axios.put(urlWithParams, amount, {
            headers: Authorizations
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Increase_inventory = async (inventoryID, amount) => {
    try {
        const urlWithParams = `${EndpointURL}/${inventoryID}/increase`;
        const response = await axios.put(urlWithParams, amount, {
            headers: Authorizations
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};