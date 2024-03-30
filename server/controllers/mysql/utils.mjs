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

export async function formatDataGameCondition(originalData) {
    return originalData.map(item => {
        let checkboxes_state = [];
        for (let key in item) {
            if (key.includes('newCustomer_state') === true) {
                const adjust = {
                    label: "",
                    checked: item[key],
                    require_minimum: item['newCustomer_require_minimum_state'],
                    minimum_price: item['newCustomer_require_minimum_value']
                }
                checkboxes_state.push(adjust);
            } else if (key.includes('orderAmount_state') === true) {
                const adjust = {
                    label: "",
                    checked: item[key],
                    minimum_order_amount: item['orderAmount_value']
                }
                checkboxes_state.push(adjust);
            } else if (key.endsWith('_state') && key.includes('limitTicket') === false && key.includes('newCustomer') === false) {
                const adjust = {
                    label: "",
                    checked: item[key]
                }
                checkboxes_state.push(adjust);
            }
        }

        return {
            id: item.id.toString(),
            gameId: item.gameId,
            checkboxes_state: checkboxes_state,
            limitTicket: {
                checked: item.limitTicket_state,
                amount: item.limitTicket_value
            }
        };
    });
}

export async function productMapping_SqlShopping(dataSql, dataLineShopping) {
    const mappedData = [];

    // Create a map of dataLineShopping for faster lookup
    const data2Map = new Map();
    for (const item of dataLineShopping) {
        data2Map.set(item.id, item);
    }

    // Map dataSql with dataLineShopping
    for (const item1 of dataSql) {
        const productId = item1.productId;
        const id = parseInt(productId); // Assuming productId is a number in dataLineShopping

        if (data2Map.has(id)) {
            const item2 = data2Map.get(id);
            let name = item2.name.replace("[ของแถม]", "").trim();
            mappedData.push({
                id: item1.id,
                gameId: item1.gameId,
                productId: productId,
                name: name,
                giveaway_amount: item1.giveawayAmount || null,
                drop_rate: item1.dropRate || null,
                image: item2.imageUrls[0],
                amount: item2.variants[0].onHandNumber,
                variantsId: item2.variants[0].id,
                inventoryId: item2.variants[0].inventoryId,
                price: item2.variants[0].price
            });
        }
    }

    return mappedData;
}

export async function game_conditionSQL(gameId, checkboxes, limitTicket) {
    // Return
    let conditions = [];
    let params = [];
    // Format
    let orderAmount_state = "";
    let orderAmount_value = "";
    let conditionProduct_state = "";
    let inviteFriend_state = "";
    let newCustomer_state = "";
    let newCustomer_require_minimum_state = "";
    let newCustomer_require_minimum_value = "";
    let limitTicket_state = "";
    let limitTicket_value = "";
    if (checkboxes) {
        orderAmount_state = checkboxes[0].checked.toString();
        orderAmount_value = checkboxes[0].minimum_order_amount;
        conditionProduct_state = checkboxes[1].checked.toString();
        inviteFriend_state = checkboxes[2].checked.toString();
        newCustomer_state = checkboxes[3].checked.toString();
        newCustomer_require_minimum_state = checkboxes[3].require_minimum.toString();
        newCustomer_require_minimum_value = parseInt(checkboxes[3].minimum_price);
        params = [orderAmount_state, orderAmount_value, conditionProduct_state, inviteFriend_state, newCustomer_state, newCustomer_require_minimum_state, newCustomer_require_minimum_value, gameId];
        conditions = "UPDATE game_condition SET " +
            "orderAmount_state = ?, " +
            "orderAmount_value = ?, " +
            "conditionProduct_state = ?, " +
            "inviteFriend_state = ?, " +
            "newCustomer_state = ?, " +
            "newCustomer_require_minimum_state = ?, " +
            "newCustomer_require_minimum_value = ? " +
            "WHERE gameId = ?";

    }
    else if (limitTicket) {
        limitTicket_state = limitTicket.checked.toString();
        limitTicket_value = parseInt(limitTicket.value);
        params = [limitTicket_state, limitTicket_value, gameId];
        conditions = "UPDATE game_condition SET limitTicket_state = ?, limitTicket_value = ? WHERE gameId = ?";

    }
    else if (checkboxes && limitTicket) {
        orderAmount_state = checkboxes[0].checked.toString();
        orderAmount_value = checkboxes[0].minimum_order_amount;
        conditionProduct_state = checkboxes[1].checked.toString();
        inviteFriend_state = checkboxes[2].checked.toString();
        newCustomer_state = checkboxes[3].checked.toString();
        newCustomer_require_minimum_state = checkboxes[3].require_minimum.toString();
        newCustomer_require_minimum_value = parseInt(checkboxes[3].minimum_price);
        limitTicket_state = limitTicket.checked.toString();
        limitTicket_value = parseInt(limitTicket.value);
        params = [orderAmount_state, orderAmount_value, conditionProduct_state, inviteFriend_state, newCustomer_state, newCustomer_require_minimum_state, newCustomer_require_minimum_value, limitTicket_state, limitTicket_value, gameId];
        conditions = "UPDATE game_condition SET " +
            "orderAmount_state = ?, " +
            "orderAmount_value = ?, " +
            "conditionProduct_state = ?, " +
            "inviteFriend_state = ?, " +
            "newCustomer_state = ?, " +
            "newCustomer_require_minimum_state = ?, " +
            "newCustomer_require_minimum_value = ?, " +
            "limitTicket_state = ?, " +
            "limitTicket_value = ? " +
            "WHERE gameId = ?";
    }
    else {
        return false;
    }
    return { sqlCommand: conditions, params: params };
}

export async function mergeRewardDetail(gameHistory, discountDetail, itemDetail) {
    return gameHistory.map(history => {
        if (history.user_reward_type === "discount") {
            const discount = discountDetail.find(detail => detail.discountCode === history.user_reward_id);
            return {
                ...history,
                rewardDetail: discount ? {
                    discountCode: discount.discountCode,
                    discountName: discount.discountName,
                    detail: discount.detail
                } : null
            };
        } else if (history.user_reward_type === "item") {
            const item = itemDetail.find(detail => detail.id === parseInt(history.user_reward_id));
            let itemName = item.name.replace("[ของแถม]", "").trim();
            return {
                ...history,
                rewardDetail: item ? {
                    productId: item.id,
                    name: itemName,
                    price: item.variants[0].price
                } : null
            };
        } else {
            // If the user_reward_type is neither "discount" nor "item", keep the history as is
            return history;
        }
    });
}

export async function getCouponData(mysql_game_coupon, mysql_coupon_created, gameId) {
    const gameCoupons = mysql_game_coupon.filter(coupon => coupon.gameId === gameId);
    const result = [];

    for (const coupon of gameCoupons) {
        const matchingCoupon = mysql_coupon_created.find(item => item.code === coupon.code);
        if (matchingCoupon) {
            const { id, code, value, startDate, endDate, quantity, limitPerUser, minPurChaseQuantity, termsAndConditions } = matchingCoupon;
            result.push({ id, name: code, value, startDate, endDate, quantity, limitPerUser, minPurChaseQuantity, termsAndConditions, drop_rate: coupon.dropRate });
        }
    }

    return result;
}

export async function generateCards(numPairs) {
    const cards = [];
    const initImage = [
        "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fgames%2Fmemory_card%2Fbf_brown.jpg?alt=media&token=b5c2b4d0-f10c-4088-bd5a-b3b8947fea16",
        "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fgames%2Fmemory_card%2Fbf_cony.jpg?alt=media&token=be77992c-c710-46dc-8320-16a03852b7c2",
        "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fgames%2Fmemory_card%2Fbf_moon.jpg?alt=media&token=9e6ff1a5-effb-49ea-aaab-66d61563a5d4",
        "https://firebasestorage.googleapis.com/v0/b/line-incubator.appspot.com/o/asset%2Fgames%2Fmemory_card%2Fbf_sally.jpg?alt=media&token=e2ba5f2c-b238-4281-9407-6c5f21ff0afe"
    ]
    for (let i = 1; i <= numPairs; i++) {
        const firstCardId = (i - 1) * 2 + 1;
        cards.push(
            { id: firstCardId, name: `Card ${i}`, url_type: "upload", image: initImage[i-1], pairId: i },
            { id: firstCardId + 1, name: `Card ${i}`, url_type: "upload", image: initImage[i-1], pairId: i }
        );
    }
    return cards;
}

// Function to convert English month to Thai month
function convertToThaiMonth(englishMonth) {
    const monthsENG = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const monthsTH = [
        "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
        "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
    ];
    // Make sure the input is in uppercase for consistency
    englishMonth = englishMonth.toUpperCase();
    // Find the index of the English month
    const index = monthsENG.indexOf(englishMonth);
    // If the index is found, return the corresponding Thai month
    if (index !== -1) {
        return monthsTH[index];
    } else {
        // If the month is not found, return an error message or handle it accordingly
        return monthsTH[3];
    }
}

function formatDate(dateString) {
    const [datePart, timePart] = dateString.split(' at ');
    const [day, month, year] = datePart.split(' ');
    const thaiMonth = convertToThaiMonth(month);
    return `${day} ${thaiMonth} ${year}`;
}

function formatDateTime(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split(' at ');
    return timePart;
}

export async function formatCouponDates(coupons) {
    const formattedCoupons = coupons.map(coupon => {
        const formattedStartDate = formatDate(coupon.startDate);
        const formattedEndDate = formatDate(coupon.endDate);
        const formattedStartTime = formatDateTime(coupon.startDate);
        const formattedEndTime = formatDateTime(coupon.endDate);
        return {
            ...coupon,
            startDate: {
                date: formattedStartDate,
                time: formattedStartTime
            },
            endDate: {
                date: formattedEndDate,
                time: formattedEndTime
            }
        };
    });

    return formattedCoupons;
}
