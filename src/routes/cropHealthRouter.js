const express = require("express");
const multer = require("multer");
const { analyzeCropHealth } = require("../controller/cropHealthController");

const cropRouter = express.Router();

const upload = multer({ dest: "uploads/" });

cropRouter.post("/analyze", upload.single("image"), analyzeCropHealth);

module.exports = cropRouter;
