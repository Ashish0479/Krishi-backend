const { generateCropHealthReport } = require("../services/cropHealthService");

async function analyzeCropHealth(req, res) {
  try {
    const { language } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ success: false, error: "No image uploaded" });
    }

    if (!language) {
      return res.status(400).json({ success: false, error: "Language is required" });
    }

    const report = await generateCropHealthReport(imageFile.path, language);

    res.status(200).json({
      success: true,
      cropHealthReport: report,
    });
  } catch (error) {
    console.error("Crop Health Controller Error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Something went wrong",
    });
  }
}

module.exports = { analyzeCropHealth };
