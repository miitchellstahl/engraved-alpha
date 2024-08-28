import { Card, CardContent, CardHeader } from "./ui/card";
import { Calendar, Cloud, SunDim } from "lucide-react";
import { Badge } from "./ui/badge";
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
  city: string;
  state: string;
  temp: number;
  currentDate: Date;
  description: WeatherDescription;
  weatherTimezone: number;
  sunsetTimestamp: number;
  sunriseTimestamp: number;
  showWall: boolean;
};

const WallWeatherCard = ({
  city,
  state,
  temp,
  currentDate,
  description,
  weatherTimezone,
  sunsetTimestamp,
  sunriseTimestamp,
  showWall,
}: Props) => {
  // Adjust the currentDate based on the weatherTimezone
  const utcTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  const adjustedTime = utcTime + weatherTimezone * 1000;
  const adjustedDate = new Date(adjustedTime);

  const sunsetTimeLocalWeather = new Date(sunsetTimestamp * 1000);
  const sunriseTimeLocalWeather = new Date(sunriseTimestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const dateInWeatherLocation = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(adjustedDate);

  // Checks if local weather time is past sunset OR if it is before sunrise. if any is true, it is night
  const isNight =
    adjustedDate >= sunsetTimeLocalWeather ||
    adjustedDate <= sunriseTimeLocalWeather;

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
    <Card
      className={`rounded-b-none lg:bg-opacity-70 border-none shadow-md relative transition-all duration-500 ${
        showWall ? "bg-slate-100" : "bg-slate-100 bg-opacity-0"
      }`}
    >
      {WeatherAnimation && (
        <Lottie
          animationData={WeatherAnimation}
          className="absolute -top-20 -right-20"
        />
      )}

      <CardHeader className="p-3">
        <Badge
          className={`flex gap-2 rounded-md w-fit bg-white ${
            showWall ? "bg-opacity-100" : "bg-opacity-50"
          }`}
        >
          <Cloud size={20} className={"text-gray-900"} />
          <span className={"text-gray-900"}>
            {city}, {state}
          </span>
        </Badge>
        <CardContent className="p-0 flex flex-col gap-10">
          <div className="weather">
            <h2 className="text-4xl font-bold">{temp}°F</h2>
          </div>
          <div className="details flex justify-between">
            <div className="weather-status flex gap-1 items-center">
              <SunDim />
              <h2 className="text-lg">{description}</h2>
            </div>
            <div className="flex gap-1 items-center">
              <Calendar size={20} />
              {dateInWeatherLocation}
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default WallWeatherCard;
