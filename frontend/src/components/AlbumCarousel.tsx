import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
import { Album } from "@/types";

type Props = {
  albums: any;
  isLoading: boolean;
};

const AlbumCarousel = ({ albums, isLoading }: Props) => {
  console.log(albums);
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getYearsAgo = (date: Date) => {
    const currentDate = new Date();
    const albumDate = new Date(date);
    return currentDate.getFullYear() - albumDate.getFullYear();
  };

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      autoplay={true}
      autoplayInterval={5000}
    >
      <CarouselContent>
        {albums?.albums?.map((album: Album) => (
          <CarouselItem key={album._id} className="rounded-md group w-full">
            <Link to={`album/${album?._id}`}>
              <div className="rounded-md ">
                <Card className="h-full rounded-md p-0">
                  <CardContent className="flex items-center justify-center p-0 h-full rounded-md relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 rounded-md z-10 opacity-40"></div>
                    <div className="user-heading flex flex-col gap-2 absolute bottom-3 left-3">
                      {isLoading ? (
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-6 w-[350px]" />
                          <Skeleton className="h-4 w-[250px]" />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1 bottom-0">
                          <h1 className="relative text-white text-xl font-bold z-20 group-hover:underline">
                            {album?.title}
                          </h1>

                          <h2 className="relative z-20 text-gray-300">
                            {formatDate(album?.albumDate) +
                              " · " +
                              getYearsAgo(album?.albumDate) +
                              " years ago"}
                          </h2>
                        </div>
                      )}
                    </div>
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={album.photos?.[0]?.photoUrl}
                        alt=""
                        className="rounded-md group-hover:opacity-75 w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AlbumCarousel;
