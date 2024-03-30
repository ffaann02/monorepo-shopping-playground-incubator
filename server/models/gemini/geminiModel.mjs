import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from 'node-fetch';
import axios from "axios";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export async function geminiTextProcessing(prompt) {
    console.log("geminiTextProcessing working");
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    return new Promise(async (resolve, reject) => {
        try {
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            resolve(response);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

async function base64(imageUrl) {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    // return `data:${response.headers.get('content-type')};base64,${buffer.toString('base64')}`;
    return buffer.toString('base64');
}

export async function geminiTextAndImageProcessing(prompt, imageBase64) {
    return new Promise(async (resolve, reject) => {
        try {
            const apikey = process.env.GEMINI_KEY;
            console.log("geminiTextAndImageProcessing is processing");
            const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + apikey;
            const payload = {
                "contents": [{
                    "parts": [{ "text": prompt },
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": imageBase64
                        }
                    }]
                }]
            };
            const result = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const textResponse = result.data.candidates[0].content.parts[0].text;
            resolve(textResponse);
        } catch (error) {
            reject(error);
        }
    })
}