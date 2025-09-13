const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const bakch = require("./test.json");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAIResponse(farmerMessage, imagePath = null) {
  if ((!farmerMessage || farmerMessage.trim() === "") && !imagePath) {
    throw { reason: "Message or image is required", statusCode: 400 };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let inputParts = [
      {
        text: `You are a helpful agricultural assistant. Respond to the following message from a farmer:\n\n${farmerMessage}
        Your goal is to provide clear, practical, and localized agricultural guidance that helps 
farmers make better decisions in real time.

### Language Instructions
- Detect the language of the farmer's message.
- If farmer writes in **Malayalam**, reply fully in **Malayalam**.  
- If farmer writes in **English**, reply in **English**.  
- If farmer mixes, reply in the **same style (Malayalam + English)**.  

`,
      },
    ];

 
    if (imagePath) {
      const imageBase64 = fs.readFileSync(imagePath).toString("base64");
      inputParts.push({
        inlineData: {
          mimeType: "image/jpeg", 
          data: imageBase64,
        },
      });
    }


    const result = await model.generateContent(inputParts);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw { reason: "Failed to get response from Gemini API", statusCode: 500 };
  }
}

module.exports = { generateAIResponse };
