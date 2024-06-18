import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const LoadingDeceasedUserCard = () => {
  return (
    <Card className="overflow-hidden h-500px group border-none shadow-none rounded-md space-y-2">
      <AspectRatio>
        <Skeleton className="h-full w-full" />
      </AspectRatio>

      <CardContent className="flex flex-col gap-3 mt-0 p-0">
        <Skeleton className="h-[14px] w-[150px]" />
        <Skeleton className="h-[10px] w-[100px]" />
      </CardContent>
    </Card>
  );
};

export default LoadingDeceasedUserCard;
