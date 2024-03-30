import { Upload_gift_image } from "../../models/firebase/FirestoreModel.mjs";
import {
  Get_all_products,
  Create_product,
  Delete_product,
  Update_product_detail,
  Delete_product_variant,
  Update_product_display_status,
  Update_product_price,
  Update_product_variant_detail,
  Create_product_variants
} from "../../models/line_shopping/ProductModels.mjs";
import { generateUniqueId } from "../firebase/utils.mjs";

// LINE SHOPPING API --------------------------------------------------------------------

export const GetAllProducts = async (req, res) => {
  try {
    const result = await Get_all_products();
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error fetch products: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const CreateProduct = async (req, res) => {
  const productContent = req.body;
  try {
    const result = await Create_product(productContent);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error create product: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const DeleteProduct = async (req, res) => {
  const productID = req.body.productID;
  try {
    const result = await Delete_product(productID);
    console.log(result);
    res.status(204).json({ message: "Delete success" });
  } catch (error) {
    res.status(500).json({ error: `Error delete product: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const UpdateProductDetail = async (req, res) => {
  const productID = req.body.productID;
  const updateDetail = req.body.updateDetail;
  console.log(productID);
  console.log(updateDetail);
  try {
    const result = await Update_product_detail(productID, updateDetail);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error update product detail: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const DeleteProductVariant = async (req, res) => {
  const productID = req.body.productID;
  const variantDetail = req.body.variantDetail;
  try {
    const result = await Delete_product_variant(productID, variantDetail);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error update product detail: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const UpdateProductDisplayStatus = async (req, res) => {
  const productID = req.body.productID;
  const status = req.body.status;
  try {
    const result = await Update_product_display_status(productID, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error update product detail: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const UpdateProductPrice = async (req, res) => {
  const productID = req.body.productID;
  const priceDetail = req.body.priceDetail;
  try {
    const result = await Update_product_price(productID, priceDetail);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error update product detail: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const UpdateProductVariantDetail = async (req, res) => {
  const productID = req.body.productID;
  const variantDetail = req.body.variantDetail;
  try {
    const result = await Update_product_variant_detail(productID, variantDetail);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error update product detail: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const CreateProductVariantDetail = async (req, res) => {
  const productID = req.body.productID;
  const variantDetail = req.body.variantDetail;
  console.log(productID);
  console.log(variantDetail);
  try {
    const result = await Create_product_variants(productID, variantDetail);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error update product detail: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

// CUSTOM --------------------------------------------------------------------

// Filter giveaway product for selection
export const GetGiveAwaysList = async (req, res) => {
  try {
    const allProducts = await Get_all_products();
    const productsForGame = await allProducts.data.filter((product) => {
      return (
        product.name.includes("[ของแถม]")) &&
        product.isDisplay === false
    })
    const response_formated = [];
    productsForGame.forEach(product => {
      const nameCut = product.name.replace("[ของแถม]", "").trim();
      const category_fullNameTh = product.category.nameTh;
      const category_splitNameTh = category_fullNameTh.split('-');
      let category_nameTh;
      if (category_splitNameTh.length > 1) {
        category_splitNameTh.forEach((item) => {
          if (item.includes('>')) {
            const splited = item.split('>');
            category_nameTh = splited[splited.length - 1];
          }
          else {
            category_nameTh = category_splitNameTh[category_splitNameTh.length - 1];
          }
        })
      }
      else {
        category_nameTh = category_splitNameTh;
      }
      response_formated.push({
        productId: product.id,
        name: nameCut,
        category: {
          id: product.category.id,
          name: category_nameTh
        },
        image: product.imageUrls[0],
        amount: product.variants[0].onHandNumber,
        variantsId: product.variants[0].id,
        inventoryId: product.variants[0].inventoryId,
        price: product.variants[0].price
      })
    });
    res.json(response_formated);
  } catch (error) {
    res.status(500).json({ error: `Error fetch products: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

// Filter onsale product for select to condition product
export const GetOnsaleProducts = async (req, res) => {
  try {
    const allProducts = await Get_all_products();
    const productsForGame = await allProducts.data.filter((product) => {
      return (
        product.isDisplay === true) &&
        product.name.includes("[ของแถม]") === false
    })

    const response_formated = [];
    productsForGame.forEach(product => {
      const category_fullNameTh = product.category.nameTh;
      const category_splitNameTh = category_fullNameTh.split('-');
      let category_nameTh;
      if (category_splitNameTh.length > 1) {
        category_splitNameTh.forEach((item) => {
          if (item.includes('>')) {
            const splited = item.split('>');
            category_nameTh = splited[splited.length - 1];
          }
          else {
            category_nameTh = category_splitNameTh[category_splitNameTh.length - 1];
          }
        })
      }
      else {
        category_nameTh = category_splitNameTh;
      }
      response_formated.push({
        productId: product.id,
        name: product.name,
        category: {
          id: product.category.id,
          name: category_nameTh
        },
        image: product.imageUrls[0],
        amount: product.variants[0].onHandNumber,
        variantsId: product.variants[0].id,
        inventoryId: product.variants[0].inventoryId,
        price: product.variants[0].price
      })
    });
    console.log(response_formated);
    res.json(response_formated);
  } catch (error) {
    res.status(500).json({ error: `Error fetch products: ${error}` });
    console.log("Response status: " + error.response.status);
    console.log(error.response.data);
  }
};

export const AddGift = async (req, res) => {
  try {
    const giftDetails = req.body.giftDetails;
    const imageBase64 = req.body.imageBase64;

    const name = "[ของแถม] " + giftDetails.name;
    const generateId = await generateUniqueId();
    const productCode = `productCode-${generateId}`;
    const barcode = `barcode-${generateId}`;
    const sku = `sku-${generateId}`;

    // upload image to firebase and get url image
    const imageUrl = await Upload_gift_image(imageBase64);

    const formatPayload = {
      brand: giftDetails.brand,
      categoryId: 162,
      code: productCode,
      description: giftDetails.description,
      imageUrls: [
        imageUrl
      ],
      instantDiscount: 0,
      name: name,
      variantOptions: {
        option1: {
          data: [
            {
              value: giftDetails.variant.value
            }
          ],
          name: giftDetails.variant.name
        }
      },
      variants: [
        {
          barcode: barcode,
          onHandNumber: parseInt(giftDetails.quantity),
          options: [
            0
          ],
          price: parseInt(giftDetails.price),
          sku: sku,
          weight: parseInt(giftDetails.weight),
        }
      ]
    }
    console.log(formatPayload);
    const result = await Create_product(formatPayload);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error add gift: ${error}` });
    console.log("Response status: " + error);
    console.log(error.response);
  }
};