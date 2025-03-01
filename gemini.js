import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getAIResponse(userMessage) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        const result = await chat.sendMessage(userMessage);
        const response = result.response.text();
        return response;
    } catch (error) {
        console.error("❌ Gemini API Error:", error);
        return "Sorry, I couldn't process that request.";
    }
}
