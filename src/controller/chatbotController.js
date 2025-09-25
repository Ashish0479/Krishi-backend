const { generateAIResponse } = require("../services/chatbotService");
const fs = require("fs");

async function chatWithKrishiSakhi(req, res) {
  try {
    const { message, userId ,weatherInfo, profile, city} = req.body;
    let imagePath = null;

   
    if (req.file) {
      imagePath = req.file.path; 
    }

    const reply = await generateAIResponse(message, imagePath, weatherInfo, profile, city);
    

    res.status(200).json({
      success: true,
      farmerMessage: message,
      aiReply: reply,
    });
  } catch (error) {
    console.error("Chatbot Controller Error:", error.reason || error.message);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.reason || "Something went wrong",
    });
  }
}

module.exports = { chatWithKrishiSakhi };
