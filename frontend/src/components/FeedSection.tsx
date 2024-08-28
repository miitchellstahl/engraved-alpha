import { Camera, ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import PhotoComponent from "./PhotoComponent";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

type Props = {
  content: any;
  contentType: string;
  firstName: string;
};

const FeedSection = ({ content, contentType, firstName }: Props) => {
  return (
    <Card className="p-3 sm:p-5 space-y-3 sm:space-y-4 shadow-sm flex flex-col">
      <CardHeader className="p-0">
        <div className="title flex gap-2 sm:gap-3 items-center">
          {contentType === "Photos" ? (
            <Camera size={15} fill="gray-900" color="gray-900" />
          ) : contentType === "Places" ? (
            <MapPin size={15} fill="gray-900" color="gray-900" />
          ) : (
            <MapPin size={15} fill="gray-900" color="gray-900" />
          )}

          <h2 className="font-bold text-sm sm:text-base">
            {firstName}'s {contentType}
          </h2>
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          {content.map((contentItem: any) => (
            <PhotoComponent
              isFeed={true}
              key={contentItem._id}
              imageUrl={contentItem.photoUrl}
              albumId={contentItem?.albumId}
              showMemento={false}
              content={contentItem.content}
              type={contentItem.type}
              date={contentItem.date}
              petName={contentItem?.petName}
              petType={contentItem?.petType}
              author={contentItem.author}
              albumTitle={contentItem?.albumTitle}
              location={contentItem?.location}
              placeName={contentItem?.placeName}
              placeLongitude={contentItem?.placeLongitude}
              placeLatitude={contentItem?.placeLatitude}
            />
          ))}
        </div>
      </CardContent>
      {content.length >= 6 && (
        <CardFooter className="p-0 flex justify-end">
          <div className="flex gap-1 items-center">
            <Link
              to={`${contentType.toLowerCase()}`}
              className="text-gray-700 underline text-sm sm:text-md cursor-pointer flex-end"
            >
              View all {contentType.toLowerCase()}
            </Link>
            <ChevronRight size={16} className="text-gray-700" />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default FeedSection;
