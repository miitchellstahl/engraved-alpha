import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Badge } from "./ui/badge";
import { MapPinIcon, ShieldCheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const MAP_ID = import.meta.env.VITE_MAP_ID;
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;

type Props = {
  cityDiedLongitude: number;
  cityDiedLatitude: number;
  location: string;
  profilePhoto: string;
  name: string;
  mappedByRelation: string;
};

const WallMap = ({
  cityDiedLongitude,
  cityDiedLatitude,
  location,
  profilePhoto,
  name,
  mappedByRelation,
}: Props) => {
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${cityDiedLatitude},${cityDiedLongitude}&zoom=18&scale=2&size=600x600&key=${MAP_API_KEY}&map_id=${MAP_ID}&style=feature:poi|visibility:off`;

  return (
    <AspectRatio className="z-30">
      <div className="w-full h-full shadow-md rounded-b-lg z-30 relative">
        <div className="w-full flex gap-2 justify-between items-center absolute top-3 px-3 z-40">
          <Badge className="flex gap-2 rounded-md bg-indigo-900 z-40">
            <MapPinIcon size={20} />
            <span>{location}</span>
          </Badge>
          {mappedByRelation && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge className="rounded-md bg-orange-900 h-full">
                    <ShieldCheckIcon size={20} className="text-white" />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  Mapped by {name}'s {mappedByRelation?.toLowerCase()}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <img
          src={staticMapUrl}
          alt="Map"
          className="w-full h-full object-cover relative"
        />
        <div className=" top-0 left-0 absolute w-full h-full flex flex-col items-center justify-center">
          <Badge className="rounded-sm py-1.5 bg-gray-50 text-gray-900 mb-2">
            {name}
          </Badge>
          <img
            src={profilePhoto}
            className="w-[48px] h-[48px] object-cover object-left rounded-md border-4 border-indigo-900"
            alt={name}
          />
        </div>
      </div>
    </AspectRatio>
  );
};

export default WallMap;
