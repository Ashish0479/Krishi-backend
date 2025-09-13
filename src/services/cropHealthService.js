const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCropHealthReport(imagePath, language) {
  try {
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString("base64");

    const prompt = `
You are Krishi Sakhi, a farming assistant specialized in Kerala agriculture.
A farmer has uploaded a crop image. Analyze the photo carefully and answer in **${language}** only.

Instructions:
1. Detect if the crop is healthy or diseased.
2. If diseased, identify the disease name.
3. Suggest practical treatment methods (organic + chemical if needed).
4. Provide prevention tips for the future.
5. Keep explanation clear and simple for farmers.

give all this in points ,not make a mesh,just keep simple, it should contains headings and subheadings

Now analyze the image:
`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      { text: prompt },
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Crop Health Service Error:", error);
    throw new Error("Failed to analyze crop health");
  } finally {
    
    try {
      fs.unlinkSync(imagePath);
    } catch {}
  }
}

module.exports = { generateCropHealthReport };
