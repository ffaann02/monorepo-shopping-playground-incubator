import { Order_messaging } from "../../models/line_shopping/OrderModel.mjs";
import { GameInvite } from "../line_message/flex_message/GameInvite.js";
import { GameInviteNew } from "../line_message/flex_message/GameInviteNew.js";

const gameType = [
    { prefix: "ws", type: "เกมหมุนวงล้อ", image: "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fshopping_clone%2FWheelSpinnerFixed.png?alt=media&token=7d9766e7-d12b-4d0e-bfb9-9e0d2b82721e" },
    { prefix: "mm", type: "เกมจับคู่การ์ด", image: "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fshopping_clone%2FMemoryCardFixed.png?alt=media&token=44944608-4071-493b-aade-c4b4dbbf6abd" },
]

const conditionText = [
    { id: 1, text: "ซื้อสินค้าครบ" },
    { id: 2, text: "ซื้อสินค้าที่เข้าร่วมรายการ" },
    { id: 3, text: "ลูกค้าใหม่ซื้อสินค้าครบ" },
    { id: 4, text: "สั่งซื้อสินค้าจากร้านครั้งแรก" },
]

const conditionRequire = [
    { id: 1, require: "require_price", text: "บาท" },
    { id: 3, require: "new_customer_require_price", text: "บาท" }
]

const textHeader = "คุณได้รับสิทธิ์เล่นเกม"

export async function PushGameInviteMessage(data) {
    try {
        console.log(data);
        const { type, image } = await getGameType(data.gameId);
        const conditionDetail = await getConditionDetail(data, data.conditionMatch);
        console.log(data.inviteLink);
        // const flexMessage = await GameInvite(textHeader, image, type, conditionDetail, data.inviteLink);
        const flexMessage = await GameInviteNew(textHeader, image, type, conditionDetail, data.inviteLink);
        const result = await Order_messaging(data.orderNumber, flexMessage);
        console.log(result);
        return
    } catch (error) {
        console.log(error);
    }
};

async function getConditionDetail(data, conditionMatch) {
    const matchedText = conditionText.find(condition => condition.id === conditionMatch)?.text;
    const matchedRequirement = conditionRequire.find(requirement => requirement.id === conditionMatch);

    if (matchedRequirement) {
        const requireKey = matchedRequirement.require;
        const requireText = matchedRequirement.text;
        const requiredAmount = data.conditionRequire[requireKey];
        return `${matchedText} ${requiredAmount} ${requireText}`;
    } else {
        return matchedText;
    }
}

async function getGameType(gameId) {
    // Extract prefix from gameId
    const prefix = gameId.split('-')[0]; 
    const matchedType = gameType.find(type => type.prefix === prefix);
    // Return type and image if found, otherwise return "Unknown" type and null image
    return matchedType ? { type: matchedType.type, image: matchedType.image } : { type: "Unknown", image: null }; 
  }