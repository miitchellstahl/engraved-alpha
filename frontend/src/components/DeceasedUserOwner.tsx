import { User } from "@/types";
import { Card, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type Props = {
  user: User;
  deceasedUserFirstName: string;
  deceasedUserRelation: string;
  isLoading: boolean;
};

const DeceasedUserOwner = ({
  user,
  deceasedUserFirstName,
  isLoading,
  deceasedUserRelation,
}: Props) => {
  return (
    <Card className="p-3 flex flex-col sm:flex-row justify-between group cursor-pointer hover:bg-gray-50">
      <CardHeader className="p-0 w-full sm:w-auto">
        <div className="flex flex-row gap-4 items-center">
          {isLoading ? (
            <Skeleton className="h-12 w-12 rounded-sm shadow-base" />
          ) : (
            <img
              src={user.imageUrl}
              alt=""
              className="h-12 w-12 rounded-sm shadow-base"
            />
          )}

          {isLoading ? (
            <div className="flex flex-col gap-2 mt-2 sm:mt-0">
              <Skeleton className="w-full sm:w-[200px] h-3" />
              <Skeleton className="w-full sm:w-[250px] h-3" />
            </div>
          ) : (
            <div className="mt-2 sm:mt-0">
              <h2 className="font-bold text-base">Managed by {user?.name}</h2>
              <h2 className="text-base">
                {deceasedUserFirstName}'s {deceasedUserRelation?.toLowerCase()}
              </h2>
            </div>
          )}
        </div>
      </CardHeader>
      <CardFooter className="p-0 mt-3 sm:mt-0">
        <Button className="w-full sm:w-auto h-8 rounded-md flex gap-2 bg-indigo-100 text-indigo-900 group-hover:bg-indigo-200">
          {isLoading ? (
            <Skeleton className="w-[80px] h-2" />
          ) : (
            <span>Contact</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeceasedUserOwner;
