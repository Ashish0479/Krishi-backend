const express = require("express");
const multer = require("multer");
const { analyzeCropHealth } = require("../controller/cropHealthController");
const uploader = require("../middleware/multer");

const cropRouter = express.Router();



cropRouter.post("/analyze", uploader.single("image"), analyzeCropHealth);

module.exports = cropRouter;
