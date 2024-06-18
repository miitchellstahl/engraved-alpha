import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const LoadingPinnedDeceasedUserCard = () => {
  return (
    <Card className="p-5 space-y-4 shadow-sm flex flex-col">
      <CardHeader className="flex flex-row gap-4 p-0">
        <Skeleton className="h-[40px] w-[40px] rounded-sm" />
        <Skeleton className="h-[14px] w-[200px]" />
      </CardHeader>
      <Separator />
      <div className="content whitespace-pre-wrap break-words">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-[10px] w-full" />
          <Skeleton className="h-[10px] w-full" />
          <Skeleton className="h-[10px] w-full" />
          <Skeleton className="h-[10px] w-full" />
          <Skeleton className="h-[10px] w-full" />
          <Skeleton className="h-[10px] w-full" />
          <Skeleton className="h-[10px] w-full" />
          <Skeleton className="h-[10px] w-full" />
        </div>
      </div>
    </Card>
  );
};

export default LoadingPinnedDeceasedUserCard;
