export async function GameInvite(textHeader, imageUrl, textGame, textDetail, inviteLink) {

    console.log("Flex message recieve link");
    console.log(inviteLink);

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
                        text: textHeader,
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
                                url: imageUrl,
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
                        text: textGame
                    },
                    {
                        type: "text",
                        text: textDetail,
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
                                type: "button",
                                action: {
                                    type: "uri",
                                    label: "เริ่มเลย!",
                                    uri: inviteLink
                                },
                                color: "#ffffff",
                                style: "primary",
                                height: "sm"
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