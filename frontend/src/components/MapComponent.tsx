import { useEffect } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import MementoComponent from "./MementoComponent";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

type Props = {
  placeLongitude: number;
  placeLatitude: number;
  showMemento?: boolean;
  placeName: string;
  author: string;
  type: string;
  content: string;
  date: Date;
};

const MapComponent = ({
  placeLongitude,
  placeLatitude,
  placeName,
  author,
  type,
  content,
  date,
  showMemento = true,
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
    <div>
      <APIProvider apiKey={MAP_API_KEY}>
        <AspectRatio>
          <div className="w-full h-full shadow-sm rounded-t-md">
            <Map
              defaultZoom={17}
              defaultCenter={{
                lat: placeLatitude,
                lng: placeLongitude,
              }}
              mapId={MAP_ID}
              disableDefaultUI
            >
              <AdvancedMarker
                className="flex flex-col justify-center items-center gap-2"
                position={{
                  lat: placeLatitude,
                  lng: placeLongitude,
                }}
              ></AdvancedMarker>
            </Map>
          </div>
        </AspectRatio>
      </APIProvider>
      {showMemento && (
        <MementoComponent
          placeName={placeName}
          author={author}
          type={type}
          content={content}
          date={date}
        />
      )}
    </div>
  );
};

export default MapComponent;
