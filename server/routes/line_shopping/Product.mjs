import express from "express"
import {
    GetAllProducts,
    CreateProduct,
    DeleteProduct,
    UpdateProductDetail,
    DeleteProductVariant,
    UpdateProductDisplayStatus,
    UpdateProductPrice,
    UpdateProductVariantDetail,
    CreateProductVariantDetail,
    GetGiveAwaysList,
    GetOnsaleProducts,
    AddGift
} from "../../controllers/line_shopping/ProductController.mjs";

const router = express.Router();

// LINE SHOPPING API --------------------------------------------------------------------

router.get("/get-all-products", async (req, res) => {
    await GetAllProducts(req, res);
});

router.post("/create-product", async (req, res) => {
    await CreateProduct(req, res);
});

router.delete("/delete-product", async (req, res) => {
    await DeleteProduct(req, res);
});

router.patch("/update-product-detail", async (req, res) => {
    await UpdateProductDetail(req, res);
});

router.post("/delete-product-variant", async (req, res) => {
    await DeleteProductVariant(req, res);
});

router.post("/update-product-display-status", async (req, res) => {
    await UpdateProductDisplayStatus(req, res);
});

router.patch("/update-product-price", async (req, res) => {
    await UpdateProductPrice(req, res);
});

router.patch("/update-product-variant-detail", async (req, res) => {
    await UpdateProductVariantDetail(req, res);
});

router.post("/create-product-variants", async (req, res) => {
    await CreateProductVariantDetail(req, res);
});

// CUSTOM --------------------------------------------------------------------

router.get("/get-giveaways-list", async (req, res) => {
    await GetGiveAwaysList(req, res);
});

router.get("/get-onsale-product", async (req, res) => {
    await GetOnsaleProducts(req, res);
});

router.post("/add-gift", async (req, res) => {
    await AddGift(req, res);
});

export default router;