import { Create_checkout_link } from "../../models/line_shopping/CheckoutLinkModels.mjs";

export const CreateCheckoutLink = async (req, res) => {
  const orderItems = req.body;
  try {
    const result = await Create_checkout_link(orderItems);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error create checkout link: ${error.response.data.message}` });
    console.log(error.response.data.info);
  }
};