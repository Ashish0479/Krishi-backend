const express = require("express");
const { fetchWeatherByCity, fetchWeatherByCoords } = require("../controller/weatherController");

const router = express.Router();

router.get("/", fetchWeatherByCity);      
router.get("/coords", fetchWeatherByCoords); 
module.exports = router;
