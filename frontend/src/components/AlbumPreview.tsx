import { Card, CardContent, CardHeader } from "./ui/card";
import { Link } from "react-router-dom";
import { Album } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import Post from "./PostComponents/Post";

type Props = {
  album: Album;
  isLoading: boolean;
};

const AlbumPreview = ({ album, isLoading }: Props) => {
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentDate = new Date();
  const albumDate = new Date(album?.albumDate);
  const yearsAgo = currentDate.getFullYear() - albumDate.getFullYear();
  console.log(album);
  return (
    <div className="">
      <Link
        to={`/profile/${album?.deceasedUser}/album/${album?._id}`}
        key={album?._id}
      >
        <Card className="p-3 w-full space-y-4 shadow-sm flex flex-col group">
          <CardHeader className="p-0">
            <div className="w-full relative h-[400px] p-5 flex flex-col justify-end ">
              {isLoading ? (
                <Skeleton className="absolute top-0 left-0 w-full object-cover h-full z-0" />
              ) : (
                <img
                  src={album?.photos?.[0]?.photoUrl}
                  alt=""
                  className="absolute top-0 left-0 w-full object-cover h-full z-0 xl:rounded-md group-hover:opacity-75"
                />
              )}
              <div className="overlay bg-gray-900 z-10 absolute opacity-40 top-0 left-0 h-full w-full xl:rounded-md"></div>
              <div className="user-heading flex flex-col gap-2">
                {isLoading ? (
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-[350px]" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 bottom-0">
                    <h1 className="relative text-white text-4xl font-bold z-20 group-hover:underline">
                      {album.title}
                    </h1>

                    <h2 className="relative z-20 text-gray-300 group-hover:underline">
                      {formatDate(album?.albumDate) +
                        " · " +
                        yearsAgo +
                        " years ago"}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="p-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 group-hover:opacity-75">
              {album.photos?.slice(0, 3).map((photo: any) => (
                <Post
                  isFeed={true}
                  key={photo._id}
                  postData={photo}
                  showMemento={false}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default AlbumPreview;
