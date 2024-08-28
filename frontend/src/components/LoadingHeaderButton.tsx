import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const LoadingHeaderButton = () => {
  return (
    <div className="button-group flex flex-col xl:flex-row w-full gap-4">
      <Button
        className="h-8 rounded-md flex gap-2 bg-indigo-100 text-indigo-900 hover:bg-indigo-200"
        disabled
      >
        <Skeleton className="h-3 w-full" />
      </Button>

      <Button
        className="h-8 rounded-md flex gap-2 bg-pink-100 text-pink-900 hover:bg-pink-200"
        disabled
      >
        <Skeleton className="h-3 w-full" />
      </Button>
    </div>
  );
};

export default LoadingHeaderButton;
