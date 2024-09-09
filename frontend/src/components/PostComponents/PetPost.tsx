import { PetPostData, PostComponentProps } from "@/types";
import { AspectRatio } from "../ui/aspect-ratio";
import MementoComponent from "../MementoComponent";

const PetPost = ({ postData, isFeed, showMemento }: PostComponentProps) => {
  const { petName, petType, photoUrl, type, date } = postData as PetPostData;
  return (
    <Card className="rounded-b-none p-0 border-none h-full w-full relative">
      <div>
        {isFeed ? (
          <AspectRatio>
            <img
              className={
                showMemento
                  ? "w-full h-full object-cover rounded-t-md group-hover:opacity-75"
                  : "w-full h-full object-cover rounded-t-sm rounded-b-sm group-hover:opacity-75"
              }
              src={photoUrl}
              alt=""
            />
          </AspectRatio>
        ) : (
          <img
            className={
              showMemento
                ? "w-full h-full object-cover rounded-t-md group-hover:opacity-75"
                : "w-full h-full object-cover rounded-t-sm rounded-b-sm group-hover:opacity-75"
            }
            src={photoUrl}
            alt=""
          />
        )}
      </div>
      {showMemento && (
        <MementoComponent
          type={type}
          content={petType}
          date={date}
          title={petName}
        />
      )}
    </Card>
  );
};

export default PetPost;
