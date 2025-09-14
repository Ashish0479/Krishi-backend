const { getWeatherByCity, getWeatherByCoords } = require("../services/weatherService");

const fetchWeatherByCity = async (req, res) => {
  const city = req.query.city || "Karnal";
  try {
    const data = await getWeatherByCity(city);

    if (!data || data.cod !== 200) {
      return res.status(data.cod).json({ error: data.message });
    }

    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      description: data.weather[0].description,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

const fetchWeatherByCoords = async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const data = await getWeatherByCoords(lat, lon);

    if (!data || data.cod !== 200) {
      return res.status(400).json({ error: data.message || "Invalid coordinates" });
    }

    res.json({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      description: data.weather[0].description,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

module.exports = { fetchWeatherByCity, fetchWeatherByCoords };
