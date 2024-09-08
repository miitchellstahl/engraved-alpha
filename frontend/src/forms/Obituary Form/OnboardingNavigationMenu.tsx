import { BookOpen, Link } from "lucide-react";
import AddToProfileNavigationButton from "@/components/AddToProfileNavigationButton";
import { Separator } from "@/components/ui/separator";
import InProgressNavigationButton from "@/components/InProgressNavigationButton";

type Props = {
  appendEulogy: (item: any) => void;
  initialData: any;
  eulogyFields: any;
};

const OnboardingNavigationMenu = ({
  appendEulogy,
  eulogyFields,
  initialData,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <AddToProfileNavigationButton
          buttonText="Add eulogy"
          handleAppend={appendEulogy}
          IconComponent={BookOpen}
        />
        <AddToProfileNavigationButton
          buttonText="Add funeral link"
          handleAppend={appendEulogy}
          IconComponent={Link}
        />
        <Separator />
        <span>Obituary:</span>
        {initialData?.obituary && (
          <InProgressNavigationButton
            imageUrl={initialData?.profilePhotoUrl}
            buttonText={`${initialData?.firstName}'s Obituary`}
          />
        )}
        <span>Eulogies:</span>
        {[...eulogyFields].reverse().map((field, index) => (
          <InProgressNavigationButton
            IconComponent={BookOpen}
            key={field.id}
            buttonText={`Eulogy ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingNavigationMenu;
