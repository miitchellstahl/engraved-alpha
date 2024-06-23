import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMyDeceasedUser } from "@/api/MyDeceasedUserApi";
import PinnedDeceasedUserCard from "@/components/PinnedDeceasedUserCard";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingPinnedDeceasedUserCard from "@/components/LoadingPinnedDeceasedUserCard";
import { getCurrentWeather } from "@/api/WidgetApi";
import WallWeatherCard from "@/components/WallWeatherCard";
import LoadingWallWeatherCard from "@/components/LoadingWallWeatherCard";
import WallMap from "@/components/WallMap";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon } from "lucide-react";

const DeceasedUserPage = () => {
  const { deceasedUserId } = useParams();

  if (!deceasedUserId) {
    return <div>Invalid deceased user ID</div>;

    // NEED THE QUERY KEY DECEASEDUSERID TO PREVENT STALE DATA ON PROFILE CHANGE
  }
  const { data: deceasedUser, isLoading: isDeceasedUserLoading } = useQuery(
    ["getDeceasedUser", deceasedUserId],
    () => getMyDeceasedUser(deceasedUserId as string),
    {}
  );

  const { data: currentWeather, isLoading: isCurrentWeatherLoading } = useQuery(
    "getCurrentWeather",
    () =>
      getCurrentWeather(
        deceasedUser?.cityDiedLongitude as string,
        deceasedUser?.cityDiedLatitude as string
      ),
    {
      enabled:
        !!deceasedUser?.cityDiedLongitude && !!deceasedUser?.cityDiedLatitude,
    }
  );
  const temp = currentWeather?.main.temp.toFixed();
  const description = currentWeather?.weather[0].main;

  const currentDate = new Date();

  //converts the date response to date format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="relative mb-5 overflow-hidden">
        <div className="xl:container xl:mt-[20px] mb-[36px]">
          <div className="w-full relative h-[400px] p-5 flex flex-col justify-end ">
            {isDeceasedUserLoading ? (
              <Skeleton className="absolute top-0 left-0 w-full object-cover h-full z-0" />
            ) : (
              <img
                src={deceasedUser?.profilePhotoUrl}
                alt=""
                className="absolute top-0 left-0 w-full object-cover h-full z-0 xl:rounded-md"
              />
            )}
            <div className="overlay bg-gray-900 z-10 absolute opacity-40 top-0 left-0 h-full w-full xl:rounded-md"></div>
            <div className="user-heading flex flex-col gap-2">
              {isDeceasedUserLoading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-[350px]" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              ) : (
                <div className="flex flex-col gap-1 bottom-0">
                  <h1 className="relative text-white text-6xl font-bold z-20">
                    {deceasedUser.firstName} {deceasedUser.lastName}
                  </h1>

                  <h2 className="relative z-20 text-gray-300">
                    {formatDate(deceasedUser.birthDate)} -
                    {formatDate(deceasedUser.deathDate)}
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="xl:container main-section px-5">
          <div className="grid lg:grid-cols-[6fr_3fr] lg:gap-10">
            <div className="feed-view">
              <h2 className="text-xl font-bold mb-[16px]">Pinned</h2>
              <div className="pinned-section space-y-5">
                {isDeceasedUserLoading ? (
                  <LoadingPinnedDeceasedUserCard />
                ) : (
                  <PinnedDeceasedUserCard
                    profilePhoto={deceasedUser?.profilePhotoUrl}
                    title={
                      deceasedUser?.firstName +
                      " " +
                      deceasedUser?.lastName +
                      "'s Obituary"
                    }
                    content={deceasedUser.obituary}
                    isLoading={isDeceasedUserLoading}
                  />
                )}

                {isDeceasedUserLoading ? (
                  <LoadingPinnedDeceasedUserCard />
                ) : (
                  deceasedUser.eulogies &&
                  deceasedUser.eulogies.map((eulogy: any) => {
                    return (
                      <PinnedDeceasedUserCard
                        profilePhoto={eulogy.eulogyAuthorPhotoUrl}
                        title={
                          eulogy.eulogyAuthor +
                          "'s Eulogy to " +
                          deceasedUser?.firstName
                        }
                        content={eulogy.eulogySpeech}
                        isLoading={isDeceasedUserLoading}
                      />
                    );
                  })
                )}
              </div>
            </div>
            <div className="wall-view lg:-mt-[300px] z-10 xl:pr-5">
              <h2 className="text-xl font-bold mb-[16px] text-white">Wall</h2>
              {!currentWeather ? (
                <LoadingWallWeatherCard />
              ) : (
                // CITY I'M GETTIN FROM THE CURRENT WEATHER RESPONSE AND STATE I'M GETTING FROM THE USER. I SHOULD MAKE THESE CONSISTENT WITH THE DATA FROM THE WEATHER RESPONSE AND GET THE STATE FROM THERE TOO
                <WallWeatherCard
                  city={deceasedUser?.cityDied}
                  currentDate={currentDate}
                  description={description}
                  state={deceasedUser?.stateDied}
                  temp={temp}
                  weatherTimezone={currentWeather?.timezone}
                  sunsetTimestamp={currentWeather?.sys.sunset}
                  sunriseTimestamp={currentWeather?.sys.sunrise}
                />
              )}
              {/* 
MAKE CUSTOM MAP LOADNIG COMPONENT */}
              {isDeceasedUserLoading ? (
                <AspectRatio>
                  <Badge className=" flex gap-2 rounded-md w-fit bg-purple-900 absolute top-3 left-3 z-10">
                    <MapPinIcon size={20} />
                    <Skeleton className="h-[12px] w-[100px] rounded-sm" />
                  </Badge>
                  <Skeleton className="h-full w-full rounded-none" />
                </AspectRatio>
              ) : (
                <WallMap
                  cityDiedLongitude={deceasedUser?.cityDiedLongitude}
                  cityDiedLatitude={deceasedUser?.cityDiedLatitude}
                  location={`${deceasedUser?.cityDied}, ${deceasedUser?.stateDied}`}
                  profilePhoto={deceasedUser?.profilePhotoUrl}
                  name={deceasedUser?.firstName}
                />
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default DeceasedUserPage;
