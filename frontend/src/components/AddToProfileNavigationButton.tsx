import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  imageUrl?: string;
  buttonText: string;
  handleAppend: (item: any) => void;
  IconComponent?: LucideIcon; // Add this line to accept a Lucide icon component
};

const AddToProfileNavigationButton = ({
  buttonText,
  imageUrl,
  handleAppend,
  IconComponent,
}: Props) => {
  return (
    <Button
      type="button"
      className="h-20 flex justify-between "
      onClick={() =>
        handleAppend({
          eulogySpeech: "",
          eulogyAuthor: "",
          eulogyAuthorPhoto: null,
        })
      }
    >
      <div className="flex items-center gap-3">
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className="h-[40px] w-[40px] rounded-sm object-cover"
          />
        )}
        {IconComponent && <IconComponent size={18} />}
        <h2 className="font-bold text-lg"> {buttonText}</h2>
      </div>
    </Button>
  );
};

export default AddToProfileNavigationButton;
