const axios = require("axios");
const bakch = require('./test.json')


async function generateAIResponse(farmerMessage) {
  if (!farmerMessage || farmerMessage.trim() === "") {
    throw { reason: "Message cannot be empty", statusCode: 400 };
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              `You are Krishi Sakhi, a helpful digital farming assistant for Kerala farmers. Reply in Malayalam unless farmer uses another language.always keep in mind the crop data given as follows: ${bakch} `,
          },
          {
            role: "user",
            content: farmerMessage,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("GROQ API Error:", error.response?.data || error.message);
    throw { reason: "Failed to get response from GROQ API", statusCode: 500 };
  }
}

module.exports = { generateAIResponse };
