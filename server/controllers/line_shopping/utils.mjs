export async function checkOrderMatchConditionProduct(orderItems, conditionProducts) {
    // Extract all productIds from conditionProducts
    const conditionProductIds = conditionProducts.map(product => product.productId);
    // Check if any productId in orderItems matches with conditionProductIds
    for (let i = 0; i < orderItems.length; i++) {
        if (conditionProductIds.includes(orderItems[i])) {
            return true; // Match found
        }
    }
    return null; // No match found
}

export async function convertBooleanValues(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key] === "true") {
                object[key] = true;
            } else if (object[key] === "false") {
                object[key] = false;
            }
        }
    }
    return object;
}
