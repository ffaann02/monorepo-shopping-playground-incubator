import { WebhookClient } from "dialogflow-fulfillment";

export function handleIntent(req, res) {
    const agent = new WebhookClient({ request: req, response: res });
    let intentMap = new Map();
  
    // Intent handlers
    intentMap.set("Test Intent", testIntent);

    agent.handleRequest(intentMap);
}

async function testIntent(agent) {
    const line_uid = agent.originalRequest.payload.data.source.userId;
    console.log("LINE User ID:", line_uid);
    agent.add(`Comming message -> ${agent.query}`);
}