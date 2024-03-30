import axios from "axios";
import Authorizations from "../../config/line_shopping/authorization.mjs";

const EndpointURL = "https://developers-oaplus.line.biz/myshop/v1/products";

export const Get_all_products = async () => {
  try {
    const response = await axios.get(EndpointURL, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Create_product = async (productContent) => {
  try {
    const response = await axios.post(EndpointURL, productContent, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Delete_product = async (productID) => {
  try {
    const urlWithParams = `${EndpointURL}/${productID}`;
    const response = await axios.delete(urlWithParams, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Update_product_detail = async (productID, updateDetail) => {
  try {
    const urlWithParams = `${EndpointURL}/${productID}`;
    const response = await axios.patch(urlWithParams, updateDetail, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Delete_product_variant = async (productID, variantDetail) => {
  try {
    const urlWithParams = `${EndpointURL}/${productID}/delete-variant-option`;
    const response = await axios.post(urlWithParams, variantDetail, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Update_product_display_status = async (productID, status) => {
  try {
    const urlWithParams = `${EndpointURL}/${productID}/display-status/${status}`;
    // {} Axios requires a data payload in the request body. 
    //    Since you are not sending any additional data in the request body, 
    //    you should pass an empty object.
    const response = await axios.post(urlWithParams, {}, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Update_product_price = async (productID, priceDetail) => {
  try {
    const urlWithParams = `${EndpointURL}/${productID}/prices`;
    const response = await axios.patch(urlWithParams, priceDetail, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Update_product_variant_detail = async (productID, variantDetail) => {
  try {
    const urlWithParams = `${EndpointURL}/${productID}/variant`;
    const response = await axios.patch(urlWithParams, variantDetail, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Create_product_variants = async (productID, variantDetail) => {
  try {
    const urlWithParams = `${EndpointURL}/${productID}/variants`;
    const response = await axios.post(urlWithParams, variantDetail, {
      headers: Authorizations
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};