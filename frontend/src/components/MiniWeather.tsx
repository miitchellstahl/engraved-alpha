import Lottie from "lottie-react";
import ClearWeather from "../assets/ClearWeather.json";
import ClearWeatherNight from "../assets/ClearWeatherNight.json";
import DrizzleWeather from "../assets/Drizzle.json";
import DrizzleWeatherNight from "../assets/DrizzleNight.json";
import CloudyWeather from "../assets/CloudyWeather.json";
import CloudyWeatherNight from "../assets/CloudyWeatherNight.json";
import AtmosphereWeather from "../assets/AtmosphereWeather.json";
import AtmosphereWeatherNight from "../assets/AtmosphereWeatherNight.json";
import ThunderstormWeather from "../assets/ThunderstormWeather.json";
import ThunderstormWeatherNight from "../assets/ThunderstormWeatherNight.json";
import SnowWeather from "../assets/SnowWeather.json";
import SnowWeatherNight from "../assets/SnowWeatherNight.json";
import RainWeather from "../assets/RainWeather.json";
import RainWeatherNight from "../assets/RainWeatherNight.json";

type WeatherDescription =
  | "Clear"
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Atmosphere"
  | "Haze"
  | "Clouds";

type Props = {
  currentDate: Date;
  description: WeatherDescription;
  weatherTimezone: number;
  sunsetTimestamp: number;
  sunriseTimestamp: number;
};

const MiniWeather = ({
  currentDate,
  description,
  weatherTimezone,
  sunsetTimestamp,
  sunriseTimestamp,
}: Props) => {
  console.log(description);
  // Adjust the current date based on the weather timezone
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  const adjustedTime = utcTime + weatherTimezone * 1000;
  const adjustedDate = new Date(adjustedTime);

  const sunsetTimeLocalWeather = new Date(sunsetTimestamp * 1000);
  const sunriseTimeLocalWeather = new Date(sunriseTimestamp * 1000);

  // Checks if the local weather time is past sunset OR if it is before sunrise. If any is true, it is night
  const isNight =
    adjustedDate >= sunsetTimeLocalWeather ||
    adjustedDate <= sunriseTimeLocalWeather;

  // Map weather descriptions to corresponding animations
  const weatherAnimations: Record<WeatherDescription, any> = {
    Clear: isNight ? ClearWeatherNight : ClearWeather,
    Thunderstorm: isNight ? ThunderstormWeatherNight : ThunderstormWeather,
    Drizzle: isNight ? DrizzleWeatherNight : DrizzleWeather,
    Rain: isNight ? RainWeatherNight : RainWeather,
    Snow: isNight ? SnowWeatherNight : SnowWeather,
    Atmosphere: isNight ? AtmosphereWeatherNight : AtmosphereWeather,
    Haze: isNight ? AtmosphereWeatherNight : AtmosphereWeather,
    Clouds: isNight ? CloudyWeatherNight : CloudyWeather,
  };

  const WeatherAnimation = weatherAnimations[description];

  return (
    <div
      className={`h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md ${
        isNight ? "bg-purple-200" : "bg-blue-200"
      }  flex justify-center items-center`}
    >
      {WeatherAnimation && (
        <Lottie animationData={WeatherAnimation} className="h-8 w-8" />
      )}
    </div>
  );
};

export default MiniWeather;
