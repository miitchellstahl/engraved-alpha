import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Badge } from "./ui/badge";
import { DeceasedUser, Place } from "@/types";
import PhotoCarousel from "./PhotoCarousel";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

type Places = {
  places: Place[];
  deceasedUser: DeceasedUser;
};

type Props = {
  places: Places;
  selectedPlace: any;
};

const PlacesPageMapComponent = ({ places, selectedPlace }: Props) => {
  const [center, setCenter] = useState({
    lat: places?.places?.[0]?.placeLatitude || 0,
    lng: places?.places?.[0]?.placeLongitude || 0,
  });

  const [selected, setSelected] = useState<Place | null>(selectedPlace || null);

  useEffect(() => {
    if (selectedPlace) {
      setCenter({
        lat: selectedPlace.placeLatitude,
        lng: selectedPlace.placeLongitude,
      });
      setSelected(selectedPlace);
    } else if (places?.places?.length > 0) {
      setCenter({
        lat: places.places[0].placeLatitude,
        lng: places.places[0].placeLongitude,
      });
      console.log("doing this with just placers");
      setSelected(places.places[0]);
    }
  }, [selectedPlace, places]);

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
    <div
      className={`${
        selectedPlace?.photos.length > 0 ? " grid grid-cols-[3fr_6fr]" : ""
      } gap-4 h-[400px]`}
    >
      {selectedPlace?.photos.length > 0 && (
        <div className="photo-place-component h-full w-full">
          <PhotoCarousel photos={selectedPlace?.photos} />
          {/* <img
            src={selectedPlace?.photos?.[0]?.photoUrl}
            alt=""
            className="h-full w-full object-cover rounded-l-md"
          /> */}
        </div>
      )}

      <APIProvider apiKey={MAP_API_KEY}>
        <div className="w-full h-full shadow-sm rounded-md">
          <Map
            defaultZoom={13}
            center={center}
            mapId={MAP_ID}
            gestureHandling="none"
            disableDefaultUI
          >
            {places?.places?.map((place: Place, index: number) => (
              <AdvancedMarker
                zIndex={selected && selected._id === place._id ? 10 : 1}
                key={index}
                className={`flex flex-col justify-center items-center gap-2 z-0 ${
                  selected && selected._id === place._id
                    ? "opacity-100"
                    : "opacity-50"
                }`}
                position={{
                  lat: place.placeLatitude,
                  lng: place.placeLongitude,
                }}
              >
                <Badge className="rounded-sm py-1.5 bg-gray-50 text-gray-900 shadow-md">
                  {place.placeName}
                </Badge>
                <img
                  src={places?.deceasedUser?.profilePhotoUrl}
                  className="w-[48px] h-[48px] object-cover object-left rounded-md border-4 border-indigo-900 shadow-md"
                />
              </AdvancedMarker>
            ))}
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default PlacesPageMapComponent;
