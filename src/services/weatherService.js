const axios = require("axios");
const { WEATHER_API_KEY } = require("../config/serverConfig");

const getWeatherByCity = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const response = await axios.get(url, {
    params: {
      q: city,
      appid: WEATHER_API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

const getWeatherByCoords = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather`;
  const response = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: WEATHER_API_KEY,
      units: "metric",
    },
  });
  return response.data;
};

module.exports = { getWeatherByCity, getWeatherByCoords };
