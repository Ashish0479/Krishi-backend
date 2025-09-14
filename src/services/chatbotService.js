const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const bakch = require("./test.json");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAIResponse(farmerMessage, imagePath = null, weatherInfo, profile, city) {
  if ((!farmerMessage || farmerMessage.trim() === "") && !imagePath) {
    throw { reason: "Message or image is required", statusCode: 400 };
  }
const farmerProfile = {
  name: profile?.name,
  email: profile?.email,
  contactNumber: profile?.contactNumber,

  gender: profile?.gender,
  dateOfBirth: profile?.dateOfBirth,

  state: profile?.state,
  district: profile?.district,
  village: profile?.village,
  pincode: profile?.pincode,
  coordinates: profile?.coordinates,

  landSize: profile?.landSize,
  landType: profile?.landType,
  currentCrop: profile?.currentCrop,
  crops: profile?.crops,
  farmingExperience: profile?.farmingExperience,
  waterSource: profile?.waterSource,
  soilType: profile?.soilType,
  plantingDate: profile?.plantingDate,

  irrigationMethod: profile?.irrigationMethod,
  fertilizerPreference: profile?.fertilizerPreference,
  pesticideUsage: profile?.pesticideUsage,
  mechanizationLevel: profile?.mechanizationLevel,

  primaryGoal: profile?.primaryGoal,
  budgetLevel: profile?.budgetLevel,
  marketAccess: profile?.marketAccess,

  pastDiseases: profile?.pastDiseases,
  yieldHistory: profile?.yieldHistory,

  preferredLanguage: profile?.preferredLanguage,
  notifications: profile?.notifications,
  premiumUser: profile?.premiumUser,
};
  const location=city||farmerProfile?.district||farmerProfile?.state||farmerProfile?.village;
  const weatherInfomain={temperature:weatherInfo?.temp,condition:weatherInfo?.condition,description:weatherInfo?.description};
console.log("Farmer Message in Service:", farmerMessage);
console.log("Profile in Service:", farmerProfile);
console.log("Weather Info in Service:", weatherInfomain);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let inputParts = [
      {
        text: `You are a helpful agricultural assistant. Respond to the following message from a farmer:\n\n${farmerMessage}
        Your goal is to provide clear, practical, and localized agricultural guidance that helps 
farmers make better decisions in real time. current location of land is: ${location}. ${weatherInfomain ? ` The current weather conditions are: ${JSON.stringify(weatherInfomain)}.` : ""}${farmerProfile ? ` The farmer's profile is: ${JSON.stringify(farmerProfile)}.` : ""}

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
