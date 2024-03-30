export async function GroupBill() {
    const message = {
        type: "flex",
        altText: "Flex Message",
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                spacing: "md",
                contents: [
                    {
                        type: "text",
                        text: "สินค้า: ผ้าเช็ดเท้า",
                        wrap: true,
                        weight: "regular",
                        gravity: "center",
                        size: "xl",
                        align: "center"
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        margin: "xxl",
                        contents: [
                            {
                                type: "image",
                                url: "https://inwfile.com/s-cx/g4ykce.jpg",
                                aspectMode: "cover",
                                size: "4xl",
                                margin: "none",
                                animated: true
                            },
                            {
                                type: "text",
                                text: "ราคารวม : 300 บาท",
                                align: "center",
                                margin: "20px",
                                size: "24px"
                            },
                            {
                                type: "text",
                                text: "ราคาหาร : 100 บาท",
                                align: "center",
                                size: "21px",
                                color: "#000000aa"
                            }
                        ]
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                type: "box",
                                layout: "vertical",
                                contents: [
                                    {
                                        type: "text",
                                        text: "ชำระเงิน",
                                        color: "#ffffff",
                                        offsetBottom: "2px"
                                    }
                                ],
                                backgroundColor: "#06c755",
                                alignItems: "center",
                                justifyContent: "center",
                                cornerRadius: "10px",
                                height: "40px",
                                width: "250px",
                                margin: "10px"
                            }
                        ],
                        height: "70px",
                        alignItems: "center",
                        cornerRadius: "10px"
                    }
                ]
            }
        }
    }
    return message;
}