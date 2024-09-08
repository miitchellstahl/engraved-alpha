import { Camera, ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import Post from "./PostComponents/Post";

type Props = {
  content: any;
  firstName: string;
};

const FeedSection = ({ content, firstName }: Props) => {
  const type = content[0].type;
  return (
    <Card className="p-3 sm:p-5 space-y-3 sm:space-y-4 shadow-sm flex flex-col">
      <CardHeader className="p-0">
        <div className="title flex gap-2 sm:gap-3 items-center">
          {type === "Photo" ? (
            <Camera size={15} fill="gray-900" color="gray-900" />
          ) : type === "Place" ? (
            <MapPin size={15} fill="gray-900" color="gray-900" />
          ) : (
            <MapPin size={15} fill="gray-900" color="gray-900" />
          )}

          <h2 className="font-bold text-sm sm:text-base">
            {firstName}'s {type}s
          </h2>
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          {content.map((contentItem: any) => (
            <Post
              isFeed={true}
              key={content._id}
              postData={contentItem}
              showMemento={false}
            />
          ))}
        </div>
      </CardContent>
      {content.length >= 6 && (
        <CardFooter className="p-0 flex justify-end">
          <div className="flex gap-1 items-center">
            <Link
              to={`${type.toLowerCase()}s`}
              className="text-gray-700 underline text-sm sm:text-md cursor-pointer flex-end"
            >
              View all {type.toLowerCase()}s
            </Link>
            <ChevronRight size={16} className="text-gray-700" />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default FeedSection;
