import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardContent } from "./ui/card";
import { DeceasedUser } from "@/types";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

type Props = {
  deceasedUser: DeceasedUser;
  isLoading: boolean;
};
const DeceasedUserCard = ({ deceasedUser, isLoading }: Props) => {
  const deathDate = new Date(deceasedUser.deathDate);
  const yearDied = deathDate.getFullYear();
  return (
    <Link to={`/profile/${deceasedUser._id}`}>
      <Card className="overflow-hidden h-500px group border-none shadow-none rounded-md space-y-1">
        <AspectRatio>
          <img
            className="object-cover w-full h-full"
            src={deceasedUser.profilePhotoUrl}
            alt="User Profile Picture"
          />
        </AspectRatio>

        <CardContent className="flex-none mt-0 p-0">
          <h2 className="text-lg font-bold group-hover:underline">
            {deceasedUser.firstName} {deceasedUser.lastName}
          </h2>
          <p className="mt-0 p-0">Died in {yearDied}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DeceasedUserCard;
