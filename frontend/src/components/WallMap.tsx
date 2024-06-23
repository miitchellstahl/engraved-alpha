import { useEffect } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Badge } from "./ui/badge";
import { MapPinIcon } from "lucide-react";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

type Props = {
  cityDiedLongitude: number;
  cityDiedLatitude: number;
  location: string;
  profilePhoto: string;
  name: string;
};

const WallMap = ({
  cityDiedLongitude,
  cityDiedLatitude,
  location,
  profilePhoto,
  name,
}: Props) => {
  useEffect(() => {
    const hideGoogleElements = () => {
      const style = document.createElement("style");
      style.innerHTML = `
        .gm-style-cc, .gmnoprint {
          display: none !important;
        }
        .gmnoprint {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    };

    hideGoogleElements();
  }, []);
  return (
    <APIProvider apiKey={MAP_API_KEY}>
      <AspectRatio>
        <div className="w-full h-full shadow-md rounded-b-lg">
          <Badge className=" flex gap-2 rounded-md w-fit bg-purple-900 absolute top-3 left-3 z-10">
            <MapPinIcon size={20} />
            {location}
          </Badge>
          <Map
            defaultZoom={17}
            defaultCenter={{
              lat: cityDiedLatitude,
              lng: cityDiedLongitude,
            }}
            mapId={MAP_ID}
            disableDefaultUI
          >
            <AdvancedMarker
              className="flex flex-col justify-center items-center gap-2"
              position={{
                lat: cityDiedLatitude,
                lng: cityDiedLongitude,
              }}
            >
              <Badge className="rounded-sm py-1.5 bg-gray-50 text-gray-900">
                {name}
              </Badge>
              <img
                src={profilePhoto}
                width={48}
                height={48}
                className="w-[48px] h-[48px] object-cover rounded-md border-4 border-purple-900 "
              />

              {/* ADD DOWN PIN */}
            </AdvancedMarker>
          </Map>
        </div>
      </AspectRatio>
    </APIProvider>
  );
};

export default WallMap;
