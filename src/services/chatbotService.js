const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


let farmerProfileCache = null;


let conversationHistory = [];

async function generateAIResponse(farmerMessage, imagePath = null, weatherInfo, profile, city) {
  if ((!farmerMessage || farmerMessage.trim() === "") && !imagePath) {
    throw { reason: "Message or image is required", statusCode: 400 };
  }


  if (profile) {
    farmerProfileCache = { ...profile };
  }

  const location = city || farmerProfileCache?.district || farmerProfileCache?.state || farmerProfileCache?.village;
  const weatherInfomain = weatherInfo
    ? `Current weather: ${weatherInfo?.temp}°C, ${weatherInfo?.condition}, ${weatherInfo?.description}.`
    : "";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


    const historyText = conversationHistory
      .map((entry) => `${entry.role}: ${entry.text}`)
      .join("\n");

    let inputParts = [
      {
        text: `You are a friendly agricultural assistant. Farmer profile: ${JSON.stringify(farmerProfileCache)}.
Always give short, clear, and practical advice (like a human conversation, not a formal letter).  
The farmer’s name is ${farmerProfileCache?.name || "Farmer"}.  
The farm location is ${location || "unknown"}.  
${weatherInfomain}

### Response Rules
- Reply naturally, like you are talking directly.  
- Do NOT write "Dear" or "Sincerely".  
- Do NOT repeat the farmer's profile info. It's just background knowledge.  
- If you know the crop from profile, use it to make advice better.  
- If farmer asks in Malayalam, reply in Malayalam.  
- If farmer asks in English, reply in English.  
- If mix, reply in the same style.  

### Conversation so far:
${historyText}

Farmer’s new message: "${farmerMessage}"
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
    const aiResponse = result.response.text();

 
    conversationHistory.push({ role: "Farmer", text: farmerMessage });
    conversationHistory.push({ role: "AI", text: aiResponse });

    if (conversationHistory.length > 12) {
      conversationHistory = conversationHistory.slice(-12);
    }

    return aiResponse;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw { reason: "Failed to get response from Gemini API", statusCode: 500 };
  }
}

module.exports = { generateAIResponse };
