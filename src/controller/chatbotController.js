const { generateAIResponse } = require("../services/chatbotService");

async function chatWithKrishiSakhi(req, res) {
  try {
    const { message, userId } = req.body;

    const reply = await generateAIResponse(message);

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
