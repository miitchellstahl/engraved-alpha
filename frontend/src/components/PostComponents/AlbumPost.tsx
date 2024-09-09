import { AlbumPostData, PostComponentProps } from "@/types";
import { AspectRatio } from "../ui/aspect-ratio";
import MementoComponent from "../MementoComponent";
import { Card } from "../ui/card";

const AlbumPost = ({ postData, isFeed, showMemento }: PostComponentProps) => {
  // Type assertion to ensure postData is AlbumPostData
  const { content, photoUrl, albumTitle, date, type } =
    postData as AlbumPostData;

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
          content={content}
          type={type}
          date={date}
          title={albumTitle}
        />
      )}
    </Card>
  );
};

export default AlbumPost;
