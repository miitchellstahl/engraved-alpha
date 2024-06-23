import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Cloud, SunDim } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const LoadingWallWeatherCard = () => {
  return (
    <Card className="rounded-b-none opacity-70 shadow-md">
      <CardHeader className="p-3">
        {" "}
        <Badge className="flex gap-2 rounded-md w-fit bg-purple-900">
          <Cloud size={20} />
          <Skeleton className="h-[12px] w-[100px] rounded-sm" />
        </Badge>
        <CardContent className="p-0 flex flex-col gap-10 pt-2">
          <div className="weather">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[14px] w-[100px] rounded-sm" />
              <Skeleton className="h-[14px] w-[100px] rounded-sm" />
            </div>
          </div>
          <div className="details flex justify-between">
            <div className="weather-status flex gap-1 items-center">
              <SunDim />
              <Skeleton className="h-[14px] w-[80px] rounded-sm" />
            </div>
            <div className="flex gap-1 items-center">
              <Calendar size={20} />
              <Skeleton className="h-[14px] w-[100px] rounded-sm" />
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default LoadingWallWeatherCard;
