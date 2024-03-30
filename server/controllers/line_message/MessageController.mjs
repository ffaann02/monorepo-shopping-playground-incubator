import { Push_message  } from "../../models/line_message/MessageModel.mjs";

export const pushMessage = async (req, res) => {
  try {
    const pushStatus = await Push_message(req.body.userID, req.body.message);
    res.json(pushStatus);
  } catch (error) {
    res.status(500).json({ error: "Error push message" });
  }
};