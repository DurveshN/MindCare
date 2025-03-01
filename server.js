import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { auth } from "./firebaseAdmin.js"; // Import Firebase authentication
import { getAIResponse } from "./gemini.js"; // ✅ Import Gemini AI function

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("MindCare Backend is Running 🚀");
});

// ✅ User Signup API
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await auth.createUser({
            email,
            password,
        });
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ❌ Login API Fix: Firebase Admin SDK **CANNOT** verify passwords
app.post("/login", async (req, res) => {
    res.status(400).json({
        error: "❌ Firebase Admin SDK does NOT handle password verification! Use Firebase Client SDK on frontend.",
    });
});

// ✅ AI Chatbot Route (Google Gemini API)
app.post("/ai-chat", async (req, res) => {
    try {
        const { userMessage } = req.body;
        const aiResponse = await getAIResponse(userMessage);
        res.json({ reply: aiResponse });
    } catch (error) {
        res.status(500).json({ error: "AI service error" });
    }
});

// ✅ Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
