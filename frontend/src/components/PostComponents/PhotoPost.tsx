import { PhotoPostData, PostComponentProps } from "@/types";
import { AspectRatio } from "../ui/aspect-ratio";
import MementoComponent from "../MementoComponent";

const PhotoPost = ({ postData, isFeed, showMemento }: PostComponentProps) => {
  // Type assertion to ensure postData is PhotoPostData
  const { content, author, photoUrl, type, date, placeName } =
    postData as PhotoPostData;

  console.log(photoUrl);

  return (
    <>
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
          content={content}
          date={date}
          title={author}
          placeName={placeName}
        />
      )}
    </>
  );
};

export default PhotoPost;
