import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardContent } from "./ui/card";
import { DeceasedUser } from "@/types";
import { Link } from "react-router-dom";
import { steps } from "@/configs/utilConfig";
import { ArrowRight } from "lucide-react";

type Props = {
  isUnfinished?: boolean;
  deceasedUser: DeceasedUser;
  currentStep?: number;
};
const DeceasedUserCard = ({ deceasedUser, isUnfinished = false }: Props) => {
  const deathDate = new Date(deceasedUser.deathDate);
  const yearDied = deathDate.getFullYear();

  const currentStepData = steps.find(
    (step) => step.number === deceasedUser?.currentStep
  );

  return (
    <Link
      to={`${
        isUnfinished
          ? `/create/${deceasedUser?._id}`
          : `/profile/${deceasedUser?._id}`
      }`}
    >
      <Card className="overflow-hidden h-500px group border-none shadow-none rounded-md bg-0 p-3 hover:bg-gray-200">
        {isUnfinished && (
          <div
            className={`personalization-tab bg-gray-500 bg-opacity-10 rounded-t-md p-2 font-semibold flex gap-2 items-center px-4`}
          >
            <div
              className={`w-3 h-3 rounded-full text-sm ${
                deceasedUser?.currentStep === 1
                  ? "bg-indigo-200"
                  : deceasedUser?.currentStep === 2
                  ? "bg-indigo-500"
                  : "bg-indigo-900"
              }`}
            ></div>
            <span>Finish & {currentStepData?.label}</span>
            <ArrowRight size={15} />
          </div>
        )}

        <div className="space-y-1 ">
          <AspectRatio>
            <img
              className="object-cover object-left w-full h-full"
              src={deceasedUser.profilePhotoUrl}
              alt="User Profile Picture"
            />
          </AspectRatio>

          <CardContent className="flex-none mt-0 p-0">
            <h2 className="text-lg font-bold">
              {deceasedUser.firstName} {deceasedUser.lastName}
            </h2>
            <p className="mt-0 p-0">Died in {yearDied}</p>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default DeceasedUserCard;
