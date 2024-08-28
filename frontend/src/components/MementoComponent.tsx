import { Clock, MapPinIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";

type Props = {
  type: string;
  content: string;
  date: Date;
  petName?: string;
  author: string;
  albumTitle?: string;
  location?: string;
  placeName?: string;
  petType?: string;
};

const MementoComponent = ({
  type,
  content,
  date,
  petName,
  author,
  albumTitle,
  placeName,
  location,
  petType,
}: Props) => {
  const convertedDate = new Date(date);
  const year = convertedDate.getFullYear();
  console.log(location);

  switch (type) {
    case "Pet":
      return (
        <Card className={"rounded-t-none p-0"}>
          <div className="">
            <CardFooter className="p-3">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-sm font-bold text-gray-900 font-bold">
                  {petName}
                </h3>
                <h3 className="text-xs font-light text-gray-500 font-light">
                  {petType}
                </h3>
              </div>
            </CardFooter>
          </div>
        </Card>
      );
    case "Photo Album":
      return (
        <Card className={"rounded-t-none p-0"}>
          <div className="">
            <CardFooter className="p-3">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-sm font-bold text-gray-900 font-bold">
                  {albumTitle}
                </h3>
                <div className="date flex gap-1 items-center">
                  <Clock size={15} className="text-gray-500" />
                  <h3 className="text-xs font-light text-gray-500 font-light">
                    From {year}
                  </h3>
                </div>
              </div>
            </CardFooter>
          </div>
        </Card>
      );
    case "Memento":
      return (
        <Card className={"p-0"}>
          <div className="">
            <CardContent className="p-3 pb-0">
              {location && (
                <div className="location flex gap-1 items-center">
                  <MapPinIcon size={15} className="text-gray-500" />
                  <h3 className="text-xs font-light text-gray-500 font-light">
                    {location}
                  </h3>
                </div>
              )}

              <div className="content font-light text-sm">
                <h3>{content}</h3>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-sm font-bold text-gray-900 font-bold">
                  {author}
                </h3>
                <div className="location flex gap-1 items-center">
                  <h3 className="text-xs font-light text-gray-500 font-light text-right">
                    written in {year}
                  </h3>
                  <Clock size={15} className="text-gray-500" />
                </div>
              </div>
            </CardFooter>
          </div>
        </Card>
      );
    case "Photo":
      return (
        <Card className={"rounded-t-none p-0"}>
          <div className="">
            <CardContent className="p-3 pb-0">
              {content && (
                <div className="content font-light text-sm">
                  <h3>{content}</h3>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-sm font-bold text-gray-900 font-bold">
                  {author}
                </h3>
                <div className="location flex gap-1 items-center">
                  <h3 className="text-xs font-light text-gray-500 font-light">
                    From {year}
                  </h3>
                  <Clock size={15} className="text-gray-500" />
                </div>
              </div>
            </CardFooter>
          </div>
        </Card>
      );
    case "Place":
      return (
        <Card className={"rounded-t-none p-0"}>
          <div className="">
            <CardContent className="p-3 pb-0">
              {content && (
                <div className="content flex justify-between font-light text-sm">
                  <h3>{content}</h3>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-sm font-bold text-gray-900 font-bold">
                  {placeName}
                </h3>
                <h3 className="text-xs font-light text-gray-500 font-light">
                  {type}
                </h3>
              </div>
            </CardFooter>
          </div>
        </Card>
      );
    case "PlacePage":
      return (
        <Card className={"p-0"}>
          <div className="">
            <CardContent className="p-3 pb-0">
              {content && (
                <div className="content flex justify-between font-light text-sm">
                  <h3>{content}</h3>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-sm font-bold text-gray-900 font-bold">
                  {placeName}
                </h3>
                <h3 className="text-xs font-light text-gray-500 font-light">
                  Explore place
                </h3>
              </div>
            </CardFooter>
          </div>
        </Card>
      );
  }
};

export default MementoComponent;
