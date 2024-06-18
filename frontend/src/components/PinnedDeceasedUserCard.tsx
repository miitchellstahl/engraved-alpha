import { useState } from "react";
import { Card, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

type Props = {
  profilePhoto: string;
  title: string;
  content: string;
  isLoading: boolean;
};

const PinnedDeceasedUserCard = ({
  profilePhoto,
  title,
  content,
  isLoading,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewContent = content.slice(0, 485);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Card className="p-5 space-y-4 shadow-sm flex flex-col">
      <CardHeader className="flex flex-row gap-4 p-0 justify-start items-start space-y-0">
        {isLoading ? (
          <Skeleton className="h-[40px] w-[40px] rounded-sm" />
        ) : (
          <img
            className="h-[40px] w-[40px] rounded-sm"
            src={profilePhoto}
            alt=""
          />
        )}

        <h2 className="font-bold m-0 my-0 mt-0 p-0">{title}</h2>
      </CardHeader>
      <Separator />
      <div className="content whitespace-pre-wrap break-words">
        {isExpanded ? content : previewContent + "..."}
      </div>
      {content.length > 485 && (
        <span
          onClick={toggleExpand}
          className="text-gray-700 underline text-md cursor-pointer"
        >
          {isExpanded ? "Show less" : "Read more"}
        </span>
      )}
    </Card>
  );
};

export default PinnedDeceasedUserCard;
