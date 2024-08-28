import AlbumPreview from "@/components/AlbumPreview";
import MementoComponent from "@/components/MementoComponent";
import PhotoComponent from "@/components/PhotoComponent";
import PlacesPageMapComponent from "@/components/PlacesPageMapComponent";
import TabNavigation from "@/components/TabNavigation";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Album, Memento, Photo, Place } from "@/types";
import { FunctionComponent, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import debounce from "lodash.debounce";

interface DeceasedUserTabPageProps {
  fetchData: (id: string, page: number, limit: number) => Promise<any>; // Adjust the return type based on actual data structure
  dataKey: string;
}

const DeceasedUserTabPage: FunctionComponent<DeceasedUserTabPageProps> = ({
  fetchData,
  dataKey,
}) => {
  const { deceasedUserId, albumId } = useParams();
  const location = useLocation();

  if (!deceasedUserId) {
    return <div>No deceased user</div>;
  }

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    remove,
  } = useInfiniteQuery(
    [dataKey, deceasedUserId],
    ({ pageParam = 1 }) =>
      dataKey === "Album" && albumId
        ? fetchData(albumId, pageParam, 10)
        : fetchData(deceasedUserId, pageParam, 10),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.currentPage + 1;
        return nextPage <= lastPage.pages ? nextPage : undefined;
      },
    }
  );

  console.log(data);

  useEffect(() => {
    // Reset the state when the location changes
    refetch();
    return () => {
      remove(); // This will reset the query when the component unmounts
    };
  }, [location, refetch, remove]);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const currentDate = new Date();

  const albumDate = new Date(data?.pages[0]?.album?.albumDate);

  const yearsAgo = currentDate.getFullYear() - albumDate.getFullYear();

  useEffect(() => {
    if (data?.pages[0]?.places && data.pages[0].places.length > 0) {
      setSelectedPlace(data.pages[0].places[0]);
    }
  }, [data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const calculateAge = (birthDate: Date, deathDate: Date) => {
    const birth = new Date(birthDate);
    const death = new Date(deathDate);

    let age = death.getFullYear() - birth.getFullYear();
    const monthDifference = death.getMonth() - birth.getMonth();
    const dayDifference = death.getDate() - birth.getDate();

    // Adjust age if death date is before birthday in the death year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    // Check for age in months
    if (age === 0) {
      if (monthDifference > 0) {
        return monthDifference + " months old";
      } else if (monthDifference === 0 && dayDifference > 0) {
        return dayDifference + " days old";
      }
    }

    // Handle case when the age in months spans across years
    if (age === 0 && monthDifference < 0) {
      return 12 + monthDifference + " months old";
    }

    // If the person is less than one year old but more than 1 month old
    if (age === 0 && monthDifference === 0 && dayDifference > 0) {
      return dayDifference + " days old";
    }

    return age + " years old";
  };

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const debouncedLoadMore = debounce(() => {
    if (hasNextPage && !isFetchingNextPage) {
      loadMore();
    }
  }, 500); // Adjust debounce delay as needed

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 300; // Increase the threshold to load earlier
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - threshold &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        debouncedLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      debouncedLoadMore.cancel();
    };
  }, [hasNextPage, isFetchingNextPage, debouncedLoadMore]);

  return (
    <div>
      <div className="relative mb-5 overflow-hidden">
        <div className="2xl:container xl:px-6">
          <TabNavigation data={data?.pages[0]} isLoading={isLoading} />

          {dataKey === "Places" ? (
            isLoading ? (
              <Skeleton className="w-full relative h-[400px]" />
            ) : (
              <PlacesPageMapComponent
                places={{
                  places: data?.pages.flatMap((page) => page.places) ?? [],
                  deceasedUser: data?.pages[0]?.deceasedUser,
                }}
                selectedPlace={selectedPlace}
              />
            )
          ) : (
            <Link to={`/profile/${deceasedUserId}`}>
              <div className="w-full relative h-[400px] p-5 flex flex-col justify-end">
                {isLoading ? (
                  <Skeleton className="absolute top-0 left-0 w-full object-cover h-full z-0" />
                ) : (
                  <>
                    {dataKey === "Photos" && (
                      <img
                        src={data?.pages[0]?.photos?.[0]?.photoUrl}
                        alt=""
                        className="absolute top-0 left-0 w-full object-cover h-full z-0 xl:rounded-md"
                      />
                    )}
                    {dataKey === "Album" && (
                      <img
                        src={data?.pages[0]?.album?.photos?.[0]?.photoUrl}
                        alt=""
                        className="absolute top-0 left-0 w-full object-cover h-full z-0 xl:rounded-md"
                      />
                    )}

                    {dataKey === "Albums" && (
                      <img
                        src={data?.pages[0]?.albums?.[0]?.photos[0]?.photoUrl}
                        alt=""
                        className="absolute top-0 left-0 w-full object-cover h-full z-0 xl:rounded-md"
                      />
                    )}
                    {dataKey === "Pets" && (
                      <img
                        src={data?.pages[0]?.pets?.[0]?.photoUrl}
                        alt=""
                        className="absolute top-0 left-0 w-full object-cover h-full z-0 xl:rounded-md"
                      />
                    )}
                  </>
                )}
                <div className="overlay bg-gray-900 z-10 absolute opacity-40 top-0 left-0 h-full w-full xl:rounded-md"></div>
                <div className="user-heading flex flex-col gap-2">
                  {isLoading ? (
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-6 w-[350px]" />
                      <Skeleton className="h-4 w-[250px]" />
                    </div>
                  ) : (
                    <>
                      {dataKey === "Albums" && (
                        <div className="absolute z-20 top-5 right-5">
                          <h2 className="z-20 text-gray-300">
                            from {data?.pages[0]?.albums?.[0]?.title}{" "}
                          </h2>
                        </div>
                      )}
                      {dataKey === "Album" ? (
                        <div className="flex flex-col gap-1 bottom-0">
                          <h1 className="relative text-white text-6xl font-bold z-20">
                            {data?.pages[0]?.album?.title}
                          </h1>

                          <h2 className="relative z-20 text-gray-300">
                            {formatDate(data?.pages[0]?.album?.albumDate) +
                              " · " +
                              yearsAgo +
                              " years ago"}
                          </h2>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <h1 className="text-white text-6xl font-bold z-20">
                            {data?.pages[0]?.deceasedUser?.firstName}{" "}
                            {data?.pages[0]?.deceasedUser?.lastName}
                          </h1>

                          <h2 className="relative z-20 text-gray-300">
                            {formatDate(
                              data?.pages[0]?.deceasedUser?.birthDate
                            )}{" "}
                            -{" "}
                            {formatDate(
                              data?.pages[0]?.deceasedUser?.deathDate
                            )}{" "}
                            •{" "}
                            {calculateAge(
                              data?.pages[0]?.deceasedUser?.birthDate,
                              data?.pages[0]?.deceasedUser?.deathDate
                            )}{" "}
                          </h2>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="2xl:container px-6 py-3 separator">
          <Separator />
        </div>

        <div className="2xl:container px-6 main-section px-5 flex flex-col space-y-2">
          {!data ? (
            <div className="justify-end w-full flex">
              <Skeleton className="w-[125px] h-3 bg-gray-200" />
            </div>
          ) : (
            <span className="text-right">
              {data?.pages[0]?.count}{" "}
              {dataKey === "Album" ? "photos" : dataKey.toLowerCase()}
            </span>
          )}

          {!data && (
            <Skeleton className="w-full bg-gray-200 h-[600px] shadow-md" />
          )}
          {dataKey === "Photos" && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1.5rem">
                {data?.pages
                  .flatMap((page) => page.photos)
                  .map((photo: Photo) => (
                    <PhotoComponent
                      key={photo._id}
                      imageUrl={photo.photoUrl}
                      isFeed={false}
                      content={photo.content}
                      type={photo.type}
                      date={photo.date}
                      author={photo.author}
                      albumTitle={photo?.albumTitle}
                      showMemento={false}
                    />
                  ))}

                {isFetchingNextPage &&
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-[300px] shadow-md"
                    />
                  ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {dataKey === "Album" && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1.5rem">
                {data?.pages
                  .flatMap((page) => page?.album?.photos)
                  .map((photo: Photo) => (
                    <PhotoComponent
                      key={photo._id}
                      imageUrl={photo?.photoUrl}
                      isFeed={false}
                      content={photo.content}
                      type={photo.type}
                      date={photo.date}
                      author={photo.author}
                      albumTitle={photo?.albumTitle}
                      showMemento={false}
                    />
                  ))}

                {isFetchingNextPage &&
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-[300px] shadow-md"
                    />
                  ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {dataKey === "Mementos" && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1.5rem">
                {data?.pages
                  .flatMap((page) => page.mementos)
                  .map((memento: Memento) => (
                    <MementoComponent
                      key={memento._id}
                      author={memento.author}
                      content={memento.content}
                      type={memento.type}
                      location={memento?.location}
                      date={memento.createdAt}
                    />
                  ))}
                {isFetchingNextPage &&
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-[100px] shadow-md"
                    />
                  ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {dataKey === "Pets" && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1.5rem">
                {data?.pages
                  .flatMap((page) => page.pets)
                  .map((photo: Photo) => (
                    <PhotoComponent
                      key={photo._id}
                      imageUrl={photo.photoUrl}
                      isFeed={false}
                      content={photo.content}
                      type={photo.type}
                      date={photo.date}
                      author={photo.author}
                      showMemento={false}
                    />
                  ))}
                {isFetchingNextPage &&
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-[300px] shadow-md"
                    />
                  ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {dataKey === "Places" && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1.5rem">
                {data?.pages
                  .flatMap((page) => page.places)
                  .map((place: any) => (
                    <div
                      key={place._id}
                      onClick={() => handlePlaceClick(place)}
                      className="cursor-pointer hover:opacity-80"
                    >
                      <MementoComponent
                        key={place._id}
                        placeName={place.placeName}
                        type={`${place.type}Page`}
                        author={place.author}
                        content={place.content}
                        date={place.date}
                      />
                    </div>
                  ))}
                {isFetchingNextPage &&
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-[100px] shadow-md"
                    />
                  ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {dataKey === "Albums" && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="1.5rem">
                {data?.pages
                  .flatMap((page) => page.albums)
                  .map((album: Album) => (
                    <AlbumPreview album={album} isLoading={isLoading} />
                  ))}
                {isFetchingNextPage &&
                  Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full h-[500px] shadow-md"
                    />
                  ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeceasedUserTabPage;
