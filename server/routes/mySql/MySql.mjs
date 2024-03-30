import express from "express"
import {
    GetConditionProducts,
    AddConditionProducts,
    GetSelectedGiveaways,
    GetGameCondition,
    UpdateGameCondition,
    GetGameProfile,
    UpdateGameName,
    GetConditionProducts_statusActive,
    CountOrderHistory,
    GetGameHistory,
    GetAllDiscount,
    GetAllSelectedGiveaways,
    UpdateGameHistory,
    UpdateSelectedGiveaways,
    InsertCouponCreated,
    CreateGameProfile,
    GetAllGameProfile,
    GetCouponCreated,
    UpdateGameProfile
} from "../../controllers/mysql/MySqlController.mjs";

const router = express.Router();

router.get("/get-condition-products", async (req, res) => {
    await GetConditionProducts(req, res);
});

router.post("/insert-condition-products", async (req, res) => {
    await AddConditionProducts(req, res);
});

router.get("/get-selected-giveaways", async (req, res) => {
    await GetSelectedGiveaways(req, res);
});

router.get("/get-all-giveaways", async (req, res) => {
    await GetAllSelectedGiveaways(req, res);
});

router.get("/get-game-condition", async (req, res) => {
    await GetGameCondition(req, res);
});

router.post("/init-game-condition", async (req, res) => {
    await GetGameCondition(req, res);
});

router.post("/update-game-condition", async (req, res) => {
    await UpdateGameCondition(req, res);
});

router.get("/get-game-profile", async (req, res) => {
    await GetGameProfile(req, res);
});

router.post("/update-game-name", async (req, res) => {
    await UpdateGameName(req, res);
});

router.get("/get-condition-products-status-active", async (req, res) => {
    await GetConditionProducts_statusActive(req, res);
});

router.get("/count-order-history", async (req, res) => {
    await CountOrderHistory(req, res);
});

router.get("/get-game-history", async (req, res) => {
    await GetGameHistory(req, res);
});

router.post("/update-game-history", async (req, res) => {
    await UpdateGameHistory(req, res);
});

router.post("/update-selected-giveaways", async (req, res) => {
    await UpdateSelectedGiveaways(req, res);
});

router.post("/insert-coupon", async (req, res) => {
    await InsertCouponCreated(req, res);
});

router.post("/create-game-profile", async (req, res) => {
    await CreateGameProfile(req, res);
});

router.get("/get-all-game-profile", async (req, res) => {
    await GetAllGameProfile(req, res);
});

router.get("/get-all-coupons", async (req, res) => {
    await GetCouponCreated(req, res);
});

router.post("/update-game-profile", async (req, res) => {
    await UpdateGameProfile(req, res);
});

export default router;