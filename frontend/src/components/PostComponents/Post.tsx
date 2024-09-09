import { Card } from "../ui/card";
import { PostData, PostComponentProps } from "@/types";
import PetPost from "./PetPost";
import PlacePost from "./PlacePost";
import PhotoPost from "./PhotoPost";
import AlbumPost from "./AlbumPost";
import MementoPost from "./MementoPost";

const PostTypeComponents: Record<
  PostData["type"],
  React.ComponentType<PostComponentProps>
> = {
  Pet: PetPost,
  Place: PlacePost,
  Photo: PhotoPost,
  "Photo Album": AlbumPost,
  Memento: MementoPost,
};

const Post = ({ isFeed, postData, showMemento }: PostComponentProps) => {
  if (!postData) {
    console.error("postData is undefined");
    return <div>Loading...</div>; // or return a loading state or error message
  }
  console.log("Post type:", postData.type);

  const PostTypeComponent = PostTypeComponents[postData.type];
  if (!PostTypeComponent) {
    console.error("No component found for post type:", postData.type);
    return null; // or return a default component
  }

  return (
    <div className={`group cursor-pointer h-fit`}>
      <PostTypeComponent
        postData={postData}
        isFeed={isFeed}
        showMemento={showMemento}
      />
    </div>
  );
};

export default Post;
