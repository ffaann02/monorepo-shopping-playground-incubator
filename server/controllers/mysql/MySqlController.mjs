import {
    Get_condition_products,
    Add_condition_products,
    Get_selected_giveaways,
    Get_game_condition,
    Update_game_condition,
    Get_discount_created,
    Get_game_profile,
    Update_game_name,
    Get_active_gameId,
    Check_IsNewCustomer,
    Get_game_history,
    Get_all_discount,
    Get_all_selected_giveaways,
    Update_game_history,
    Delete_selected_giveaways_with_gameId,
    Insert_selected_giveaways,
    Insert_coupon_created,
    Get_game_coupon_with_gameId,
    Get_coupon_created,
    Get_latest_gameId,
    Insert_game_profile,
    Insert_game_condition,
    Get_all_game_profile,
    Update_multiple_games
} from "../../models/mysql/MySqlModel.mjs";
import { Get_all_products } from "../../models/line_shopping/ProductModels.mjs";
import {
    Get_game_decoration,
    Update_game_decoration,
    Insert_game_decoration,
    Insert_game_setting,
    Get_image_bytes_logoLine,
    Upload__game_decoration_image
} from "../../models/firebase/FirestoreModel.mjs";
import {
    convertBooleanValues,
    formatDataGameCondition,
    productMapping_SqlShopping,
    game_conditionSQL,
    mergeRewardDetail,
    getCouponData,
    generateCards,
    formatCouponDates
} from "./utils.mjs";

export const GetConditionProducts = async (req, res) => {
    try {
        const gameId = req.query.gameId;
        const products = await Get_condition_products(gameId);
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: `Error get participating-products: ${error}` });
    }
};

export const AddConditionProducts = async (req, res) => {
    try {
        const productId = req.body.productId;
        const seller = req.body.seller;
        const products = await Add_condition_products(productId, seller);
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: `Error update participating-products: ${error}` });
    }
};

const GetSelectedGiveaways_Unformated = async () => {
    try {
        const products = await Get_selected_giveaways();
        return products;
    } catch (error) {
        throw error;
    }
};

export const GetSelectedGiveaways = async (req, res) => {
    try {
        const gameId = req.query.gameId;

        // SQL data
        const mysql_products = await Get_selected_giveaways(gameId);
        // const mysql_discount = await Get_discount_created(gameId);
        const mysql_game_coupon = await Get_game_coupon_with_gameId(gameId);
        const mysql_coupon_created = await Get_coupon_created();
        const coupon_mapped = await getCouponData(mysql_game_coupon, mysql_coupon_created, gameId)

        // Shopping API
        const line_shopping_products = await Get_all_products();
        const product_mapped = await productMapping_SqlShopping(mysql_products, line_shopping_products.data);

        const formatedData = {
            giveaway: product_mapped,
            discount: coupon_mapped
        }

        res.json(formatedData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get selected-giveaways: ${error}` });
    }
};

// Get condition product
export const GetGameCondition = async (req, res) => {
    try {
        const gameId = req.query.gameId;
        console.log(gameId);
        // SQL data
        const game_profile = await Get_game_profile(gameId);
        const game_condition = await Get_game_condition(gameId);
        const condition_products = await Get_condition_products(gameId);

        // Firebase
        const game_decoration = await Get_game_decoration(gameId);

        // Shopping API
        const line_shopping_products = await Get_all_products();

        // Map productId with data
        const product_mapped = await productMapping_SqlShopping(condition_products, line_shopping_products.data);

        // convert to boolean, ex. "true" to true.
        game_condition.forEach(item => {
            convertBooleanValues(item);
        });
        const game_condition_formatted = await formatDataGameCondition(game_condition);
        const response_data = {
            gameProfile: game_profile,
            condition: game_condition_formatted[0],
            conditionProducts: product_mapped,
            decoration: game_decoration
        }
        res.json(response_data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get game condition: ${error}` });
    }
};

export const GetGameProfile = async (req, res) => {
    try {
        const gameId = req.query.gameId;
        const game_profile = await Get_game_profile(gameId);
        res.json(game_profile[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get game profile: ${error}` });
    }
}

export const UpdateGameName = async (req, res) => {
    try {
        const gameId = req.body.gameId;
        const gameName = req.body.gameName;
        const dateLastEdited = new Date();
        const formattedDate = `${dateLastEdited.getDate().toString().padStart(2, '0')}/${(dateLastEdited.getMonth() + 1).toString().padStart(2, '0')}/${(dateLastEdited.getFullYear() + 543).toString()}`;
        const game_profile = await Update_game_name(gameId, gameName, formattedDate);
        res.json(game_profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get game profile: ${error}` });
    }
}

export const InitGameCondition = async (req, res) => {
    try {
        const initData = {
            orderAmount_state: "false",
            orderAmount_value: 300,
        }
        res.json(response_data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get selected-giveaways: ${error}` });
    }
};

export const UpdateGameCondition = async (req, res) => {
    try {
        const body = req.body;
        const gameId = body.gameId;
        const checkboxes = body.data.game_condition_checkboxes;
        const limitTicket = body.data.game_condition_limitTicket;
        const game_decoration = body.data.game_decoration;
        const game_conditionNeetToUpdate = await game_conditionSQL(gameId, checkboxes, limitTicket);
        if (game_conditionNeetToUpdate !== false) {
            console.log("UpdateGameCondition: SQL Update");
            const sqlResponse = await Update_game_condition(game_conditionNeetToUpdate.sqlCommand, game_conditionNeetToUpdate.params);
        }
        if (game_decoration) {
            console.log("UpdateGameCondition: Firebase Update");
            const firebaseResponse = await Update_game_decoration(gameId, game_decoration);
        }
        res.json({ message: "Update game condition sucess" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error post update game condition: ${error}` });
    }
};

export const GetConditionProducts_statusActive = async (req, res) => {
    try {
        const game_active = await Get_active_gameId();
        const gameId = game_active[0].gameId;
        const game_condition = await Get_game_condition(gameId);
        const game_condition_converted = await convertBooleanValues(game_condition[0]);
        const condition_product = await Get_condition_products(gameId);
        res.json(condition_product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get active gameId: ${error}` });
    }
};

export const CountOrderHistory = async (req, res) => {
    try {
        const orderHistory = await Check_IsNewCustomer("รุดฟาน", "0828189716");
        res.json(orderHistory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get order history: ${error}` });
    }
};

export const GetGameHistory = async (req, res) => {
    try {
        const gameHistory = await Get_game_history();
        const allDiscount = await Get_all_discount();
        const line_shopping_products = await Get_all_products();
        const gameHistoryWithDiscountDetail = await mergeRewardDetail(gameHistory, allDiscount, line_shopping_products.data);
        res.json(gameHistoryWithDiscountDetail);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get game history: ${error}` });
    }
};

export const GetAllDiscount = async (req, res) => {
    try {
        const allDiscount = await Get_all_discount();
        res.json(allDiscount);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get all discount: ${error}` });
    }
};

export const GetAllSelectedGiveaways = async (req, res) => {
    try {
        const all = await Get_all_selected_giveaways();
        res.json(all);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get all discount: ${error}` });
    }
};

export const UpdateGameHistory = async (req, res) => {
    try {
        const user_gameStatus = req.body.user_gameStatus;
        const user_reward_type = req.body.user_reward_type;
        const user_reward_id = req.body.user_reward_id;
        const date = req.body.date;
        const orderNumber = req.body.orderNumber;
        const updateGameHistory = await Update_game_history(user_gameStatus, user_reward_type, user_reward_id, date, orderNumber);
        res.json(updateGameHistory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error update game history: ${error}` });
    }
};

export const UpdateSelectedGiveaways = async (req, res) => {
    try {
        const gameId = req.body.gameId;
        const giveLists = req.body.giveLists;
        const lists = giveLists.map((list) => list.productId);
        const deleteList = await Delete_selected_giveaways_with_gameId(gameId);
        const insert = await Insert_selected_giveaways(gameId, lists);
        res.json(insert);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get update selected giveaways: ${error}` });
    }
};

export const InsertCouponCreated = async (req, res) => {
    try {
        const { code, value, startDate, endDate, quantity, limitPerUser, minPurchaseQuantity, termsAndConditions } = req.body;

        // Convert '-' to null for minPurchaseQuantity
        const convertedMinPurchaseQuantity = minPurchaseQuantity === '-' ? null : minPurchaseQuantity;
        // Convert 'No limit', '-', or '' to null for limitPerUser
        const convertedLimitPerUser = ['No limit', '-', ''].includes(limitPerUser) ? null : limitPerUser;
        const convertedTermsAndConditions = ['No limit', '-', ''].includes(termsAndConditions) ? null : termsAndConditions;

        const result = await Insert_coupon_created(code, value, startDate, endDate, quantity, convertedLimitPerUser, convertedMinPurchaseQuantity, convertedTermsAndConditions);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error insert coupon: ${error}` });
    }
};

export const CreateGameProfile = async (req, res) => {
    try {
        const { gameName, gameType, dateCreated, status } = req.body;
        const gameId = await Get_latest_gameId(gameType);

        // set game profile
        const result = await Insert_game_profile(gameId, gameName, gameType, dateCreated, status);

        // set game condition or setting, decoration
        if (gameType === "ws") {
            // game condition
            const wsCondition = {
                orderAmount_state: 'false',
                conditionProduct_state: 'false',
                inviteFriend_state: 'false',
                newCustomer_state: 'false',
                newCustomer_require_minimum_state: 'false',
                limitTicket_state: 'false'
            }
            await Insert_game_condition(gameId, wsCondition);
            // game decoration
            const wsDecoration = {
                outerBorderWidth: 8,
                outerBorderColor: "#00B900",
                radiusLineWidth: 6,
                radiusLineColor: "#00B900",
                innerRadius: 6,
                innerBorderColor: "#00B900",
                innerBorderWidth: 4,
                spinDuration: 0.5,
                pointerProps: {
                    src: null,
                    style: {}
                }
            }
            await Insert_game_decoration(gameId, wsDecoration);
        }
        else if (gameType === "mm") {
            // game setting
            const defaultCards = await generateCards(4);
            const mmSetting = {
                cards: defaultCards,
                conditionAttempt: [],
                conditionTime: [],
                conditions: {
                    time: true,
                    attempt: false
                },
                difficultyLevel: {
                    cardCount: 4,
                    label: "ง่ายมาก",
                    value: "very_easy"
                }
            }
            await Insert_game_setting(gameId, mmSetting);
            // game decoration
            const mmDecoration = {
                border_color: "#000000",
                background_color: "#1EC687",
                back_logo_url: "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fgames%2Fmemory_card%2Fline.png?alt=media&token=cf0340b6-eb0d-4749-b004-769916d05ccb"
            }
            await Insert_game_decoration(gameId, mmDecoration);
            // init image to game_setting_image
            const blob = await Get_image_bytes_logoLine();
            await Upload__game_decoration_image(gameId, blob);

        }
        res.json({ message: "init game success", newGameId: gameId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error insert game profile: ${error}` });
    }
}

export const GetAllGameProfile = async (req, res) => {
    try {
        const gameImage = [
            { prefix: "ws", type: "เกมหมุนวงล้อ", image: "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fshopping_clone%2FWheelSpinnerFixed.png?alt=media&token=7d9766e7-d12b-4d0e-bfb9-9e0d2b82721e" },
            { prefix: "mm", type: "เกมจับคู่การ์ด", image: "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fshopping_clone%2FMemoryCardFixed.png?alt=media&token=44944608-4071-493b-aade-c4b4dbbf6abd" },
        ]
        const gameStatusText = [
            { status: "private", text: "ไม่สาธารณะ" },
            { status: "active", text: "กำลังใช้งาน" },
            { status: "inactive", text: "ปิดการใช้งาน" },
        ]
        // get all rows from game_profile sql
        const all_game_profile = await Get_all_game_profile();
        const formatData = await all_game_profile.map(obj => {
            const newObj = { ...obj };
            // Re-format dateCreated value
            newObj.dateCreated = newObj.dateCreated.replace(/-/g, '/');
            // Check if dateLastEdited is null, then replace it with dateCreated
            if (newObj.dateLastEdited === null) {
                newObj.dateLastEdited = newObj.dateCreated;
            }
            else {
                newObj.dateLastEdited = newObj.dateLastEdited;
            }
            // Match image with game type
            const matchingImage = gameImage.find(imgObj => imgObj.prefix === newObj.gameType);
            if (matchingImage) {
                newObj.imageSrc = matchingImage.image;
                newObj.typeDetail = matchingImage.type;
            }
            else {
                newObj.imageSrc = null
            }
            // Match image with game type
            const matchingStatusText = gameStatusText.find(statusObj => statusObj.status === newObj.status);
            if (matchingStatusText) {
                newObj.rawStatus = newObj.status;
                newObj.status = matchingStatusText.text;
            }
            else {
                newObj.rawStatus = newObj.status;
                newObj.status = null
            }
            // Re-name and add key
            newObj.title = newObj.gameName;
            newObj.lastEdited = newObj.dateLastEdited;
            // Destructure and create a cut object without it
            const { gameName, dateLastEdited, ...cutObj } = newObj
            return cutObj; // Return the modified object
        });
        res.json(formatData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error all game profile: ${error}` });
    }
};

export const GetCouponCreated = async (req, res) => {
    try {
        const result = await Get_coupon_created();
        const formatResult = await formatCouponDates(result);
        res.json(formatResult);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error get coupon: ${error}` });
    }
};

export const UpdateGameProfile = async (req, res) => {
    try {
        const updateList = req.body;
        const updateIds = updateList.map(list => list.gameId);
        const updateStatus = updateList.map(list => list.rawStatus);
        let caseStatements = '';
        updateIds.forEach((gameId, index) => {
            caseStatements += `when '${gameId}' then '${updateStatus[index]}' `;
        });
        const sqlQuery = `
                            UPDATE game_profile
                            SET status = CASE gameId
                            ${caseStatements}
                            else status
                            END
                            WHERE gameId IN (${updateIds.map(id => `'${id}'`).join(', ')});
                        `;
        const result = await Update_multiple_games(sqlQuery);
        res.json("test");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Error update game profile: ${error}` });
    }
};