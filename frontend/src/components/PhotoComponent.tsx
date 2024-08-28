import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Card, CardHeader } from "./ui/card";
import MementoComponent from "./MementoComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { MapPinIcon } from "lucide-react";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

type Props = {
  imageUrl: string;
  isFeed: boolean;
  albumId?: string;
  showMemento?: boolean;
  content: string;
  type: string;
  date: Date;
  petName?: string;
  author: string;
  albumTitle?: string;
  location?: string;
  petType?: string;
  placeLatitude?: number;
  placeLongitude?: number;
  placeName?: string;
};

const PhotoComponent = ({
  imageUrl,
  isFeed,
  albumId,
  showMemento = true,
  content,
  type,
  date,
  petName,
  author,
  albumTitle,
  location,
  petType,
  placeLatitude,
  placeLongitude,
  placeName,
}: Props) => {
  const photoDate = new Date(date);
  const year = photoDate.getFullYear();

  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${placeLatitude},${placeLongitude}&zoom=16&scale=2&size=600x600&key=${MAP_API_KEY}&map_id=${MAP_ID}&markers=${placeLatitude},${placeLongitude}&style=feature:poi|visibility:off`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`group cursor-pointer h-fit`}>
          <Card className="rounded-b-none p-0 border-none h-full w-full relative">
            {location && !isFeed && (
              <Badge className="flex gap-1 rounded-md w-fit bg-white text-gray-700 font-light absolute top-3 left-3 z-10 hover:bg-white">
                <MapPinIcon size={15} />
                {location}
              </Badge>
            )}

            <CardHeader className="p-0">
              {/* Maybe add aspect ratio here */}

              {isFeed ? (
                <AspectRatio>
                  <img
                    className={
                      showMemento
                        ? "w-full h-full object-cover rounded-t-md group-hover:opacity-75"
                        : "w-full h-full object-cover rounded-t-sm rounded-b-sm group-hover:opacity-75"
                    }
                    src={placeLatitude ? mapImageUrl : imageUrl}
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
                  src={placeLatitude ? mapImageUrl : imageUrl}
                  alt=""
                />
              )}
            </CardHeader>
          </Card>
          {showMemento && (
            <MementoComponent
              type={type}
              content={content}
              date={date}
              petName={petName}
              author={author}
              albumTitle={albumTitle}
              location={location}
              petType={petType}
              placeName={placeName}
            />
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          {type === "Pet" && <DialogTitle>{petName}</DialogTitle>}
          {type === "Photo" && (
            <>
              <DialogTitle>{content}</DialogTitle>
              <DialogDescription>submitted by {author}</DialogDescription>
            </>
          )}
          {type === "Photo Album" && (
            <>
              <DialogTitle>{albumTitle}</DialogTitle>
              <DialogDescription>{year}</DialogDescription>
            </>
          )}
        </DialogHeader>
        <img src={placeLatitude ? mapImageUrl : imageUrl} alt="" />
        {type === "Photo Album" && (
          <DialogFooter>
            <Link
              className="text-gray-700 underline text-md"
              to={`albums/${albumId}`}
            >
              View full album
            </Link>
          </DialogFooter>
        )}
        {type === "Place" && (
          <DialogFooter>
            <Link className="text-gray-700 underline text-md" to={`places`}>
              Explore place
            </Link>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhotoComponent;
