const axios = require("axios");

const summarizeText = async (text) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text }] }],
    },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

const analyzeSentiment = async (text) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: `Analyze the sentiment: ${text}` }] }],
    },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
};

module.exports = {
  summarizeText,
  analyzeSentiment,
};
