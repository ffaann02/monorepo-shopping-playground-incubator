import {
  Get_users_database,
  Get_game_decoration,
  Get_game_setting,
  Upload__game_setting_image,
  Get_game_setting_image,
  Update_game_setting,
  Upload__game_decoration_image,
  Get_game_decoration_image,
  Update_game_decoration,
  Insert_reward_history,
  Get_image_bytes_logoLine
} from "../../models/firebase/FirestoreModel.mjs";
import { Push_message } from "../../models/line_message/MessageModel.mjs";
import { Order_detail, Order_messaging } from "../../models/line_shopping/OrderModel.mjs";
import { GameReward } from "../line_message/flex_message/GameReward.js";
import { filterUpdatedCardsImageUpload, filterUpdatedCardsImageLink, getDifficultyInfo, generateUniqueIdWithTimestamp, getCurrentTime } from "./utils.mjs";

export const GetUsersDatabase = async (req, res) => {
  try {
    const result = await Get_users_database();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error fetch user database: ${error}` });
    console.log(error);
  }
};

export const GetGameDecoration = async (req, res) => {
  try {
    const gameId = req.query.gameId;
    const result = await Get_game_decoration(gameId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error fetch user database: ${error}` });
    console.log(error);
  }
};

export const GetGameSetting = async (req, res) => {
  try {
    const gameId = req.query.gameId;
    const result = await Get_game_setting(gameId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error fetch user database: ${error}` });
    console.log(error);
  }
};

export const UploadGameSettingImage = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const pairId = req.body.pairId;
    const base64String = req.body.base64String;
    const result = await Upload__game_setting_image(gameId, pairId, base64String);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error fetch user database: ${error}` });
    console.log(error);
  }
};

export const UpdateGameSetting = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const updatedCards = req.body.updatedCards;
    const difficultyLevel = req.body.difficultyLevel;
    const conditions = req.body.conditions;
    const decoration = req.body.decoration;
    const conditionTime = req.body.conditionTime;
    const conditionAttempt = req.body.conditionAttempt;
    const giftList = req.body.giftList;

    // Remove duplicate pairId
    const uniquePairs = {};
    const updatedCardsCompressed = [];
    if (updatedCards) {
      updatedCards.forEach(item => {
        if (!uniquePairs[item.pairId]) {
          uniquePairs[item.pairId] = true;
          updatedCardsCompressed.push(item);
        }
      });
    }


    let updateData = {};


    // Get url image of upload type
    if (updatedCardsCompressed.length > 0) {
      const cardsImageUpload = await filterUpdatedCardsImageUpload(updatedCardsCompressed);
      const cardsImageLink = await filterUpdatedCardsImageLink(updatedCardsCompressed);
      
      let formatEachCard = [];
      for (let i = 0; i < cardsImageUpload.length; i++) {
        const url = await Get_game_setting_image(gameId, cardsImageUpload[i].name);
        formatEachCard.push({
          name: `Card ${cardsImageUpload[i].pairId}`,
          pairId: cardsImageUpload[i].pairId,
          url_type: "upload",
          image: url
        });
      }
      for (let i = 0; i < cardsImageLink.length; i++) {
        formatEachCard.push({
          name: `Card ${cardsImageLink[i].pairId}`,
          pairId: cardsImageLink[i].pairId,
          url_type: "link",
          image: cardsImageLink[i].image
        });
      }
      // Duplicate each card and assign unique ids
      const duplicatedCards = formatEachCard.flatMap(card => [
        { ...card, id: card.pairId * 2 - 1 },
        { ...card, id: card.pairId * 2 }
      ]);
      console.log(duplicatedCards);
      updateData = {
        cards: duplicatedCards
      };
    }
    if (difficultyLevel) {
      const formatDifficulty = await getDifficultyInfo(difficultyLevel)
      updateData.difficultyLevel = formatDifficulty;
    }
    if (conditions) {
      updateData.conditions = conditions;
    }
    if(conditionTime){
      updateData.conditionTime = conditionTime;
    }
    if(conditionAttempt){
      updateData.conditionAttempt = conditionAttempt;
    }
    // if(giftList){

    // }
    if (decoration) {
      const decorationImageUrl = await Get_game_decoration_image(gameId);
      const updateDecoration = {
        border_color: decoration.border_color,
        background_color: decoration.background_color,
        back_logo_url: decorationImageUrl
      }
      const decorationResult = await Update_game_decoration(gameId, updateDecoration);
    }
    const updateResult = await Update_game_setting(gameId, updateData);
    res.json(updateResult);
  } catch (error) {
    res.status(500).json({ error: `Error fetch user database: ${error}` });
    console.log(error);
  }
};

export const UploadGameDecorationImage = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const base64String = req.body.base64String;
    const result = await Upload__game_decoration_image(gameId, base64String);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error fetch user database: ${error}` });
    console.log(error);
  }
};

export const GetGameDecorationImage = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const url = await Get_game_decoration_image(gameId);
    res.json(url);
  } catch (error) {
    res.status(500).json({ error: `Error fetch user database: ${error}` });
    console.log(error);
  }
};

export const InsertRewardHistory = async (req, res) => {
  try {
    console.log(req.body);
    const gameId = req.body.gameId;
    const orderNumber = req.body.orderNumber;
    const conditionMatch = req.body.conditionMatch;
    const resultGift = req.body.resultGift;

    // Get Order detail LINE SHOPPING API
    const orderDetail = await Order_detail(orderNumber);
    console.log(orderDetail);

    const documentID = await generateUniqueIdWithTimestamp(gameId);
    console.log(documentID);
    const { day, month, year, hour, minute } = await getCurrentTime();

    const data = {
      gameId: gameId,
      orderNumber: orderNumber,
      conditionMatch: conditionMatch,
      reward: {
        productId:resultGift.productId,
        name: resultGift.name,
        price: resultGift.price,
        image: resultGift.image,
        variantsId: resultGift.variantsId,
        inventoryId: resultGift.inventoryId
      },
      date: {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute: minute
      },
      orderDetail: {
        orderStatus: orderDetail.orderStatus,
        orderItems: orderDetail.orderItems,
        shippingAddress: orderDetail.shippingAddress,
        payment: {
          paymentStatus: orderDetail.paymentStatus,
          paymentMethod: orderDetail.paymentMethod
        },
        price:{
          totalPrice: orderDetail.totalPrice,
          subtotalPrice: orderDetail.subtotalPrice,
          discountAmount: orderDetail.discountAmount
        },
        weight: orderDetail.weight,
        time:{
          checkoutAt: orderDetail.checkoutAt,
          lastUpdatedAt: orderDetail.lastUpdatedAt,
          paidAt: orderDetail.paidAt
        },
        isGift: orderDetail.isGift,
        remarkBuyer: orderDetail.remarkBuyer,
        remarkRecipient: orderDetail.remarkRecipient
      }
    }
    const result = await Insert_reward_history(documentID, data);

    const dataFlexMessage = {
      orderNumber: orderNumber,
      conditionMatch: conditionMatch,
      reward: {
        productId:resultGift.productId,
        name: resultGift.name,
        price: resultGift.price,
        image: resultGift.image,
        variantsId: resultGift.variantsId,
        inventoryId: resultGift.inventoryId
      }
    }
    const testMessage = {
      type: "text",
      text: resultGift.name
    }
    const flexMessage = await GameReward(resultGift.name, resultGift.image, resultGift.price);
    const pushMessage = await Order_messaging(orderNumber, flexMessage);
    console.log("push message reward: ");
    console.log(pushMessage);

    res.json(result);
  } catch (error) {
    // res.status(500).json({ error: `Error fetch user database: ${error}` });
    // console.log(error);
  }
};

export const testGetBytes = async(req, res) => {
  try{
    const gameId = "testBytesUpload";
    const blob = await Get_image_bytes_logoLine();
    const result = await Upload__game_decoration_image(gameId, blob);
    res.json(result);
  } catch(error){
    console.log(error)
  }
}