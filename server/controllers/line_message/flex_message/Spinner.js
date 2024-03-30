export async function Spinner() {
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
                        text: "คุณได้รับสิทธ์หมุนวงล้อ !",
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
                                url: "https://ahaslides.com/wp-content/uploads/2022/05/Group-2642.png",
                                size: "lg"
                            }
                        ]
                    },
                    {
                        type: "text",
                        weight: "regular",
                        size: "lg",
                        align: "center",
                        wrap: true,
                        margin: "10px",
                        text: "สุ่มรับส่วนลดและของแถมต่าง ๆ"
                    },
                    {
                        type: "text",
                        text: "หมุนวงล้อฟรีเมื่อซื้อสินค้าครบ 300 บาท",
                        weight: "regular",
                        size: "md",
                        align: "center",
                        wrap: true
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                type: "text",
                                text: "เริ่มเลย!",
                                weight: "regular",
                                size: "xl",
                                align: "center",
                                wrap: true,
                                color: "#ffffff"
                            }
                        ],
                        alignItems: "center",
                        justifyContent: "center",
                        height: "45px",
                        margin: "10px",
                        backgroundColor: "#06c755",
                        cornerRadius: "10px"
                    }
                ]
            }
        }
    }
    return message;
}