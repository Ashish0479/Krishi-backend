const express = require("express");
const { chatWithKrishiSakhi } = require("../controller/chatbotController");
const upload = require("../middleware/multer");

const chatRouter = express.Router();

chatRouter.post("/", upload.single("image"), chatWithKrishiSakhi);

module.exports = chatRouter;
