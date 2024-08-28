import { useState, useRef, useEffect } from "react";
import {
  useApiIsLoaded,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";

const MAP_ID = import.meta.env.VITE_MAP_ID;

const initialCenter = {
  lat: -3.745,
  lng: -38.523,
};

type Props = {
  handleCancelPlaceInput: () => void;
};

const AddPlace = ({ handleCancelPlaceInput }: Props) => {
  const { setValue } = useFormContext();
  const apiIsLoaded = useApiIsLoaded();
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [center, setCenter] = useState(initialCenter);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!apiIsLoaded || !placesLib || !map || !autocompleteRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteRef.current
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        if (location) {
          const newCenter = {
            lat: location.lat(),
            lng: location.lng(),
          };
          setCenter(newCenter);
          map.panTo(newCenter);
        }
      }
    });
  }, [apiIsLoaded, placesLib, map]);

  const handleMapIdle = () => {
    if (map) {
      const newCenter = {
        lat: map.getCenter()?.lat() || 0,
        lng: map.getCenter()?.lng() || 0,
      };
      setCenter(newCenter);
      setValue("placeLatitude", newCenter.lat);
      setValue("placeLongitude", newCenter.lng);
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng;
    if (latLng) {
      const newMarkerPosition = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      };
      setCenter(newMarkerPosition);
    }
  };

  if (!apiIsLoaded) return <div>Loading map...</div>;

  return (
    <>
      <Input
        ref={autocompleteRef}
        type="text"
        placeholder="Enter a place"
        className="z-100"
      />
      <div className="space-y-4 relative w-full h-[400px]">
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={center}
          mapId={MAP_ID}
          zoom={14}
          onClick={(event: any) => handleMapClick(event)}
          onIdle={handleMapIdle}
          streetViewControl={false}
          fullscreenControl={false}
          disableDefaultUI
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <img
            src="https://maps.gstatic.com/mapfiles/markers2/marker.png"
            alt="center marker"
          />
        </div>
      </div>
      <Button
        className="bg-gray-100 hover:bg-gray-200 text-gray-900"
        type="button"
        onClick={handleCancelPlaceInput}
      >
        Cancel
      </Button>
    </>
  );
};

export default AddPlace;
