const express = require("express");
const { fetchWeatherByCity, fetchWeatherByCoords } = require("../controller/weatherController");

const router = express.Router();

router.get("/", fetchWeatherByCity);       // /api/weather?city=Delhi
router.get("/coords", fetchWeatherByCoords); // /api/weather/coords?lat=28.6&lon=77.2

module.exports = router;
