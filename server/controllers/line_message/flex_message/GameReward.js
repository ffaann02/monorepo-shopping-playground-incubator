export async function GameReward(rewardName, rewardImage, rewardPrice) {
    const message = {
        type: "flex",
        altText: "Flex Message",
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: "รางวัลของคุณ",
                        weight: "bold",
                        size: "xl",
                        align: "center",
                        color: "#36BA85"
                    },
                    {
                        type: "image",
                        url: rewardImage,
                        size: "3xl"
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                type: "text",
                                text: "สินค้า",
                                align: "center",
                                weight: "bold",
                                size: "lg",
                                color: "#36BA85"
                            },
                            {
                                type: "text",
                                text: rewardName,
                                align: "center",
                                wrap: true,
                                size: "sm",
                                offsetTop: "sm"
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "มูลค่ารางวัลที่คุณได้รับ",
                                        size: "md",
                                        weight: "bold"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: `${rewardPrice}`,
                                                weight: "regular",
                                                size: "md",
                                                align: "end"
                                            },
                                            {
                                                type: "text",
                                                text: "฿",
                                                size: "lg",
                                                offsetStart: "md"
                                            }
                                        ],
                                        alignItems: "center"
                                    }
                                ],
                                paddingTop: "sm",
                                alignItems: "center",
                                offsetTop: "md"
                            }
                        ],
                        paddingTop: "lg"
                    }
                ]
            }
        }
    }
    return message;
}