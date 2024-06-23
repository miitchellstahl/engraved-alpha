const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentWeather = async (lon: string, lat: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/widget/weather/${lon}/${lat}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get weather data");
  }

  return response.json();
};
