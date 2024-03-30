import { Get_users_database, Update_user_database } from "../../models/firebase/FirestoreModel.mjs";
import {
    Get_active_gameId,
    Get_game_condition,
    Get_condition_products,
    Insert_game_history, // Moved to firebase
    Get_game_profile,
    Insert_order_history,
    Check_IsNewCustomer
} from "../../models/mysql/MySqlModel.mjs";
import { Order_messaging } from "../../models/line_shopping/OrderModel.mjs";
import { Spinner } from "../line_message/flex_message/Spinner.js";
import { checkOrderMatchConditionProduct, convertBooleanValues } from "./utils.mjs";
import { PushGameInviteMessage } from "./GameInvite.mjs";

const InviteLinkPrefix = process.env.LINE_SHOPPING_CLONE_URL;

// Condition for  handle each webhook type
export const handleShoppingWebhook = async (req, res) => {
    try {
        console.log('Received LINE Shopping webhook event:', req.body);

        const user_recipientName = req.body.shippingAddress.recipientName;
        const user_phoneNumber = req.body.shippingAddress.phoneNumber;
        const orderNumber = req.body.orderNumber;
        const totalPrice = req.body.totalPrice;
        const orderItems = req.body.orderItems.length;

        // Payment status -> NO_PAYMENT, PAID, PENDING_REFUND
        const paymentStatus = req.body.paymentStatus;
        if (paymentStatus === 'PAID') {
            const insertOrderHistory = await Insert_order_history(user_recipientName, user_phoneNumber, orderNumber, totalPrice, orderItems);
            console.log(insertOrderHistory);
            await CanPlayGame(req, res);
        }
        // else if (paymentStatus === 'NO_PAYMENT' && req.body.event.name === 'ORDER.PENDING_PAYMENT') {
        //     await UpdateUserPhoneNo(req, res);
        // }
        else {
            res.json({ message: 'Webhook event received successfully' });
        }
    } catch (error) {
        console.error('Error handling webhook event:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

async function findUidByPhoneNumber(data, phoneNumber) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].data.phoneNo === phoneNumber) {
            return data[i].userId;
        }
    }
    return null; // Return null if no matching userId is found
}

async function GetUsersDatabase() {
    try {
        const result = await Get_users_database();
        return result;
    } catch (error) {
        return null;
    }
}

async function UpdateUserPhoneNo(req, res) {
    try {
        const phoneNumber = req.body.shippingAddress.phoneNumber;
        // Get users data from firebase firestore
        const users = await GetUsersDatabase();
        const userId = await findUidByPhoneNumber(users, phoneNumber);
        if (userId) {
            console.log(`userId for phone number ${phoneNumber}: ${userId}`);
        } else {
            console.log(`No userId found for phone number ${phoneNumber}`);
        }
        const result = await Update_user_database(userId, phoneNumber);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error update user phone number message" });
    }
}


const pushSpinnerMessage = async (req, res) => {
    try {
        const orderId = req.body.orderNumber;
        const flexMessage = await Spinner();
        const pushMessage = await Order_messaging(orderId, flexMessage);
        res.json(pushMessage);
    } catch (error) {
        console.error('Error pushing message to LINE:', error.message);
        res.status(500).json({ error: "Error pushing message" });
    }
};

const CanPlayGame = async (req, res) => {
    const orderItems = req.body.orderItems;
    const orderTotalPrice = req.body.totalPrice;
    const orderProduct = orderItems.map(product => product.productId);
    console.log("orderProduct: ");
    console.log(orderProduct);

    try {
        // Find game for user
        const game_active = await Get_active_gameId();
        const gameId = game_active[0].gameId;
        const game_condition = await Get_game_condition(gameId);
        const game_condition_converted = await convertBooleanValues(game_condition[0]);
        console.log(game_condition_converted);

        // Data game for history
        const gameProfile = await Get_game_profile(gameId);
        console.log(gameProfile);
        const gameName = gameProfile[0].gameName;
        const orderNumber = req.body.orderNumber;
        const user_recipientName = req.body.shippingAddress.recipientName;
        const user_phoneNumber = req.body.shippingAddress.phoneNumber;
        const user_gameStatus = "invited";

        // Link for playgame
        let TemplateLink;
        if (gameId) {
            TemplateLink = `${InviteLinkPrefix}/game/${gameId}/${orderNumber}`;
        }
        else {
            res.json({ canPlayGame: true, message: "No game active now" });
            return
        }

        let conditionMatch = null;

        // orderAmount
        if (game_condition_converted.orderAmount_state === true) {
            if (orderTotalPrice >= game_condition_converted.orderAmount_value) {
                // Push message
                const user_gameCondition = "orderAmount";
                conditionMatch = 1;
            }
        }
        // conditionProduct
        if (game_condition_converted.conditionProduct_state === true) {
            const condition_product = await Get_condition_products(gameId);
            const matchProduct = await checkOrderMatchConditionProduct(orderProduct, condition_product);
            if (matchProduct) {
                // Push message
                const user_gameCondition = "match condition product";
                conditionMatch = 2;
            }
        }
        // newCustomer
        if (game_condition_converted.newCustomer_state === true) {
            const isNewCustomer = Check_IsNewCustomer(user_recipientName, user_phoneNumber);
            if (isNewCustomer === true && game_condition_converted.newCustomer_require_minimum_state === true) {
                if (orderTotalPrice >= game_condition_converted.newCustomer_require_minimum_value) {
                    // Push message
                    const user_gameCondition = "new customer with require minimum price";
                    conditionMatch = 3;
                }
            }
            else if (isNewCustomer === true && game_condition_converted.newCustomer_require_minimum_state === false) {
                // Push message
                const user_gameCondition = "new customer without require minimum price";
                conditionMatch = 4;
            }
        }

        if (conditionMatch) {
            const InviteFullLink = `${TemplateLink}/${conditionMatch}`;
            const flexMessageData = {
                gameId: gameId,
                inviteLink: InviteFullLink,
                orderNumber: orderNumber,
                conditionMatch: conditionMatch,
                conditionRequire: {
                    require_price: game_condition_converted.orderAmount_value || null,
                    new_customer_require_price: game_condition_converted.newCustomer_require_minimum_value || null
                }
            }
            await PushGameInviteMessage(flexMessageData);
            res.json({ canPlayGame: true, conditionMatch: conditionMatch });
            return
        }
        else {
            console.log("Can't play game");
            res.json({ canPlayGame: false, message: "Can't play game" });
            return
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get active gameId: ${error}` });
        return
    }
};