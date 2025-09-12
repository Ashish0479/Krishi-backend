const express = require("express");
const { chatWithKrishiSakhi } = require("../controller/chatbotController");

const chatRouter = express.Router();

chatRouter.post("/", chatWithKrishiSakhi);

module.exports = chatRouter;
