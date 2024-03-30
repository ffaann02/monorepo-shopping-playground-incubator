export async function GameInviteNew(textHeader, imageUrl, textGame, textDetail, inviteLink) {

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
                type: "image",
                url: imageUrl,
                size: "xl"
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: textGame,
                    align: "center",
                    weight: "bold",
                    size: "lg"
                  },
                  {
                    type: "text",
                    text: textDetail,
                    align: "center"
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    contents: [
                      {
                        type: "text",
                        text: "จากหมายเลขคำสั่งซื้อ",
                        color: "#949494",
                        size: "sm"
                      },
                      {
                        type: "text",
                        text: "#347289748329384284",
                        weight: "bold",
                        size: "sm"
                      }
                    ],
                    paddingTop: "sm",
                    alignItems: "center"
                  }
                ],
                paddingTop: "lg"
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "เริ่มเล่นเกม",
                      uri: inviteLink
                    },
                    color: "#ffffff"
                  }
                ],
                backgroundColor: "#36BA85",
                cornerRadius: "md",
                margin: "none",
                width: "200px"
              }
            ],
            flex: 0,
            justifyContent: "center",
            alignItems: "center"
          }
        }
      }
    return message;
}