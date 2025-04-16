import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

export const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("❌ summarizeText Gemini error:", error.response?.data || error.message);
    throw new Error("Failed to summarize text.");
  }
};

export const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [{ parts: [{ text }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (error) {
    console.error("❌ analyzeSentiment Gemini error:", error.response?.data || error.message);
    throw new Error("Failed to analyze sentiment.");
  }
};
