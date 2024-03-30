import axios from "axios";
import Authorizations from "../../config/line_shopping/authorization.mjs";

const EndpointURL = "https://developers-oaplus.line.biz/myshop/v1/checkout-link";

export const Create_checkout_link = async (orderItems) => {
    try {
        const response = await axios.post(EndpointURL, orderItems, {
          headers: Authorizations
        });
        return response.data;
      } catch (error) {
        throw error;
      }
  };