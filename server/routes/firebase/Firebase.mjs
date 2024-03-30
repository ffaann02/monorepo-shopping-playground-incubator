import express from "express"
import {
    GetUsersDatabase,
    GetGameDecoration,
    GetGameSetting,
    UploadGameSettingImage,
    UpdateGameSetting,
    UploadGameDecorationImage,
    GetGameDecorationImage,
    InsertRewardHistory,
    testGetBytes
} from "../../controllers/firebase/FirebaseController.mjs";

const router = express.Router();

router.get("/users", async (req, res) => {
    await GetUsersDatabase(req, res);
});

router.get("/game_decoration", async (req, res) => {
    await GetGameDecoration(req, res);
});

router.get("/get-game-setting", async (req, res) => {
    await GetGameSetting(req, res);
});

router.post("/upload-game-setting-image", async (req, res) => {
    await UploadGameSettingImage(req, res);
});

router.post("/update-game-setting", async (req, res) => {
    await UpdateGameSetting(req, res);
});

router.post("/upload-game-decoration-image", async (req, res) => {
    await UploadGameDecorationImage(req, res);
});

router.get("/get-game-decoration-image", async (req, res) => {
    await GetGameDecorationImage(req, res);
});

router.post("/insert-reward-history", async (req, res) => {
    await InsertRewardHistory(req, res);
});

router.get("/test-get-bytes", async (req, res) => {
    await testGetBytes(req, res);
});

export default router;