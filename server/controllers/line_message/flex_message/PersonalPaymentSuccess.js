export async function PersonalPaymentSuccess() {
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
                        text: "ชำระเงินเสร็จสิ้น!",
                        weight: "bold",
                        size: "xl",
                        align: "center",
                        color: "#06c755"
                    },
                    {
                        type: "text",
                        text: "30/01/2567 15:26 น.",
                        align: "center"
                    },
                    {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                            {
                                type: "text",
                                text: "สินค้า : เสื้อเชิ้ตแฟชั่น",
                                weight: "bold",
                                size: "md",
                                align: "start",
                                wrap: true
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "490-",
                                        weight: "regular",
                                        size: "md",
                                        align: "end",
                                        wrap: true,
                                        maxLines: 10
                                    }
                                ],
                                width: "40px"
                            }
                        ],
                        margin: "10px"
                    },
                    {
                        type: "separator",
                        margin: "10px"
                    },
                    {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                            {
                                type: "text",
                                text: "สินค้า : กางเกงยีนส์",
                                weight: "bold",
                                size: "md",
                                align: "start",
                                wrap: true
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "800-",
                                        weight: "regular",
                                        size: "md",
                                        align: "end",
                                        wrap: true,
                                        maxLines: 10
                                    }
                                ],
                                width: "40px"
                            }
                        ],
                        margin: "10px"
                    },
                    {
                        type: "separator",
                        margin: "10px"
                    },
                    {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                            {
                                type: "text",
                                text: "สินค้า : เข็มขัดหนัง",
                                weight: "bold",
                                size: "md",
                                align: "start",
                                wrap: true
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "110-",
                                        weight: "regular",
                                        size: "md",
                                        align: "end",
                                        wrap: true,
                                        maxLines: 10
                                    }
                                ],
                                width: "40px"
                            }
                        ],
                        margin: "10px"
                    },
                    {
                        type: "separator",
                        margin: "10px"
                    },
                    {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                            {
                                type: "text",
                                text: "รวม",
                                weight: "bold",
                                size: "md",
                                align: "start",
                                wrap: true
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "1400-",
                                        weight: "bold",
                                        size: "md",
                                        align: "end",
                                        wrap: true,
                                        maxLines: 10
                                    }
                                ],
                                width: "50px"
                            }
                        ],
                        margin: "10px"
                    }
                ]
            }
        }
    }
    return message;
}