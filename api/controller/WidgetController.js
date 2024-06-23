const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
import fetch from "node-fetch";

const getCurrentWeather = async (req, res) => {
  const { lat, lon } = req.params;
  console.log(req.params);

  if (!lat || !lon) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPENWEATHER_API_KEY}`;

    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error("Error fetching weather");
    }
    const weatherData = await weatherResponse.json();
    return res.status(200).json(weatherData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch weather" });
  }
};

export default { getCurrentWeather };
