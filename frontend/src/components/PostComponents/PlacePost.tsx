import { PostComponentProps, PlacePostData } from "@/types";
import { AspectRatio } from "../ui/aspect-ratio";
import MementoComponent from "../MementoComponent";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

const PlacePost = ({ postData, isFeed, showMemento }: PostComponentProps) => {
  const { content, placeLatitude, placeLongitude, placeName, type, date } =
    postData as PlacePostData;

  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${placeLatitude},${placeLongitude}&zoom=16&scale=2&size=600x600&key=${MAP_API_KEY}&map_id=${MAP_ID}&markers=${placeLatitude},${placeLongitude}&style=feature:poi|visibility:off`;

  return (
    <>
      <div>
        {isFeed ? (
          <AspectRatio>
            <img
              className={
                showMemento
                  ? "w-full h-full object-cover rounded-t-md group-hover:opacity-75"
                  : "w-full h-full object-cover rounded-t-sm rounded-b-sm group-hover:opacity-75"
              }
              src={mapImageUrl}
              alt=""
            />
          </AspectRatio>
        ) : (
          <img
            className={
              showMemento
                ? "w-full h-full object-cover rounded-t-md group-hover:opacity-75"
                : "w-full h-full object-cover rounded-t-sm rounded-b-sm group-hover:opacity-75"
            }
            src={mapImageUrl}
            alt=""
          />
        )}
      </div>
      {showMemento && (
        <MementoComponent
          type={type}
          content={content}
          date={date}
          title={placeName}
        />
      )}
    </>
  );
};

export default PlacePost;
