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

type Props = {
  city: string;
  state: string;
  temp: number;
  currentDate: Date;
  description: string;
  weatherTimezone: number;
  sunsetTimestamp: number;
  sunriseTimestamp: number;
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
}: Props) => {
  console.log(weatherTimezone);

  //for some reason the currentDate is displaying the actual time instead of accounting got the GMT -0400 like sunrise and sunset, making it 4 hours in advance. So I manually made it 4 hours less, this will prob need to be fixed
  const fourHoursLessDate = new Date(
    currentDate.getTime() - 4 * 60 * 60 * 1000
  );
  const utcTime =
    fourHoursLessDate.getTime() + fourHoursLessDate.getTimezoneOffset() * 60000;
  const adjustedTime = utcTime + weatherTimezone * 1000;
  const adjustedDate = new Date(adjustedTime);

  const sunsetTimeLocalWeather = new Date(
    (weatherTimezone + sunsetTimestamp) * 1000
  );
  const sunriseTimeLocalWeather = new Date(
    (weatherTimezone + sunriseTimestamp) * 1000
  );

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const dateInWeatherLocation = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(adjustedDate);

  //checks if local weather time is past sunset OR if it is before sunrise. if any is true, it is night
  const isNight =
    adjustedDate >= sunsetTimeLocalWeather ||
    adjustedDate <= sunriseTimeLocalWeather;

  let hours = adjustedDate.getUTCHours();
  const minutes = adjustedDate.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hoursDate = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;

  console.log(currentDate);
  console.log(adjustedDate);
  console.log("SUNRISE" + sunriseTimeLocalWeather);
  console.log("SUNSET" + sunsetTimeLocalWeather);
  console.log(adjustedDate);
  console.log(hoursDate);
  return (
    <Card className="rounded-b-none lg:opacity-70 shadow-md relative">
      {description === "Clear" &&
        (isNight ? (
          <Lottie
            animationData={ClearWeatherNight}
            className="absolute -top-20 -right-20"
          />
        ) : (
          <Lottie
            animationData={ClearWeather}
            className="absolute -top-20 -right-20"
          />
        ))}

      {description === "Thunderstorm" &&
        (isNight ? (
          <Lottie
            animationData={ThunderstormWeatherNight}
            className="absolute -top-20 -right-20"
          />
        ) : (
          <Lottie
            animationData={ThunderstormWeather}
            className="absolute -top-20 -right-20"
          />
        ))}

      {description === "Drizzle" &&
        (isNight ? (
          <Lottie
            animationData={DrizzleWeatherNight}
            className="absolute -top-20 -right-20"
          />
        ) : (
          <Lottie
            animationData={DrizzleWeather}
            className="absolute -top-20 -right-20"
          />
        ))}

      {description === "Rain" &&
        (isNight ? (
          <Lottie
            animationData={RainWeatherNight}
            className="absolute -top-20 -right-20"
          />
        ) : (
          <Lottie
            animationData={RainWeather}
            className="absolute -top-20 -right-20"
          />
        ))}

      {description === "Snow" &&
        (isNight ? (
          <Lottie
            animationData={SnowWeatherNight}
            className="absolute -top-20 -right-20"
          />
        ) : (
          <Lottie
            animationData={SnowWeather}
            className="absolute -top-20 -right-20"
          />
        ))}

      {description === "Atmosphere" &&
        (isNight ? (
          <Lottie
            animationData={AtmosphereWeatherNight}
            className="absolute -top-20 -right-20"
          />
        ) : (
          <Lottie
            animationData={AtmosphereWeather}
            className="absolute -top-20 -right-20"
          />
        ))}

      {description === "Clouds" &&
        (isNight ? (
          <Lottie
            animationData={CloudyWeatherNight}
            className="absolute -top-20 -right-20"
          />
        ) : (
          <Lottie
            animationData={CloudyWeather}
            className="absolute -top-20 -right-20"
          />
        ))}

      <CardHeader className="p-3">
        <Badge className="flex gap-2 rounded-md w-fit bg-purple-900">
          <Cloud size={20} />
          <span>
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
