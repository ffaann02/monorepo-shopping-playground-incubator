export async function GroupPaymentSuccess() {
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
                        align: "center"
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        margin: "lg",
                        spacing: "sm",
                        contents: [
                            {
                                type: "image",
                                url: "https://i.ibb.co/VQWbVDt/different-types-of-check-marks-and-crosses.png",
                                size: "lg"
                            }
                        ]
                    },
                    {
                        type: "text",
                        text: "สินค้า : ผ้าเช็ดเท้า",
                        weight: "regular",
                        size: "lg",
                        align: "center",
                        wrap: true,
                        margin: "10px"
                    },
                    {
                        type: "text",
                        text: "ราคา : 300-",
                        weight: "regular",
                        size: "lg",
                        align: "center",
                        wrap: true
                    },
                    {
                        type: "text",
                        text: "ชำระเงินครบทุกคนเเล้ว",
                        weight: "bold",
                        size: "xl",
                        align: "center",
                        wrap: true
                    }
                ]
            }
        }
    }
    return message;
}