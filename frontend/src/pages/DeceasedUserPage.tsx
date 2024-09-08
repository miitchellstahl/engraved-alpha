import { useQuery } from "react-query";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  getDeceasedUserAlbums,
  getDeceasedUserWall,
  getOneDeceasedUser,
} from "@/api/DeceasedUserApi";
import { Helmet } from "react-helmet";
import PinnedDeceasedUserCard from "@/components/PinnedDeceasedUserCard";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingPinnedDeceasedUserCard from "@/components/LoadingPinnedDeceasedUserCard";
import { getCurrentWeather } from "@/api/WidgetApi";
import WallWeatherCard from "@/components/WallWeatherCard";
import LoadingWallWeatherCard from "@/components/LoadingWallWeatherCard";
import WallMap from "@/components/WallMap";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Edit, MapPinIcon } from "lucide-react";
import DeceasedUserButtonHeader from "@/components/DeceasedUserButtonHeader";
import { Separator } from "@/components/ui/separator";
import Post from "@/components/PostComponents/Post";
import LoadingHeaderButton from "@/components/LoadingHeaderButton";
import MementoComponent from "@/components/MementoComponent";
import FeedSection from "@/components/FeedSection";
import AlbumCarousel from "@/components/AlbumCarousel";
import PostMemento from "@/components/PostDialogComponents/PostMemento";
import TabNavigation from "@/components/TabNavigation";
import AlbumPreview from "@/components/AlbumPreview";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/UserContext";
import { Album } from "@/types";
import DeceasedUserOwner from "@/components/DeceasedUserOwner";
import Logo from "../assets/IconLogo.svg";

const DeceasedUserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [searchParams] = useSearchParams();
  const isNewProfile = searchParams.get("newProfile") === "true";

  // States for component visibility
  const [showHeader, setShowHeader] = useState(!isNewProfile);
  const [showPinned, setShowPinned] = useState(!isNewProfile);
  const [showFeed, setShowFeed] = useState(!isNewProfile);
  const [showWall, setShowWall] = useState(!isNewProfile);
  const [showTabNavigation, setShowTabNavigation] = useState(!isNewProfile);
  const [showPostMemento, setShowPostMemento] = useState(!isNewProfile);
  const [showWelcome, setShowWelcome] = useState(!isNewProfile);

  const { deceasedUserId } = useParams();
  if (!deceasedUserId) {
    return <div>Invalid deceased user ID</div>;

    // NEED THE QUERY KEY DECEASEDUSERID TO PREVENT STALE DATA ON PROFILE CHANGE
  }

  const { userId } = useContext(UserContext);

  const { data: deceasedUser, isLoading: isDeceasedUserLoading } = useQuery(
    ["getDeceasedUser", deceasedUserId],
    () => getOneDeceasedUser(deceasedUserId as string),
    {}
  );

  const { data: wallViewContent, isLoading: isWallViewLoading } = useQuery(
    ["getWallViewContent", deceasedUserId, 1], // Initial page is 1
    () => getDeceasedUserWall(deceasedUserId as string),
    {}
  );

  //TO DO: RENDER ONLY THE FIRST PHOTO IN THE ALBUM FOR THE ALBUM COMPONENT INSTEAD OF RENDERING ALL PHOTOS IN ALBUM
  const { data: deceasedUserAlbums, isLoading: isDeceasedUserAlbumsLoading } =
    useQuery(
      ["getDeceasedUserAlbums", deceasedUserId],
      () => getDeceasedUserAlbums(deceasedUserId as string),
      {}
    );

  const { data: currentWeather, isLoading: isWeatherLoading } = useQuery(
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
  console.log(deceasedUser);

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

  useEffect(() => {
    if (deceasedUser && isNewProfile) {
      const timer0 = setTimeout(() => setShowWelcome(true), 500);
      const timer1 = setTimeout(() => setShowWelcome(false), 3000);
      const timer2 = setTimeout(() => setShowTabNavigation(true), 3700);
      const timer3 = setTimeout(() => setShowHeader(true), 6100);
      const timer4 = setTimeout(() => setShowPostMemento(true), 4400);
      const timer5 = setTimeout(() => setShowWall(true), 5100);
      const timer6 = setTimeout(() => setShowPinned(true), 4400);
      const timer7 = setTimeout(() => setShowFeed(true), 4400);

      // Remove the newProfile parameter from the URL
      const timer8 = setTimeout(() => {
        navigate(`/profile/${deceasedUserId}`, { replace: true });
      }, 6200);

      return () => {
        clearTimeout(timer0);
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer6);
        clearTimeout(timer7);
        clearTimeout(timer8);
      };
    } else {
      // If it's not a new profile, show all components immediately
      console.log("not new profile");
    }
  }, [
    isDeceasedUserLoading,
    deceasedUser,
    isNewProfile,
    navigate,
    deceasedUserId,
  ]);

  return (
    <div>
      {deceasedUser && (
        <Helmet>
          <title>{`${deceasedUser.firstName} ${deceasedUser.lastName} | Engraved Memorial Page`}</title>
          <link rel="icon" href={Logo} />
        </Helmet>
      )}
      {/* Welcome Heading */}
      {isNewProfile && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-1000 ${
            showWelcome ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          <h1 className="text-6xl font-semibold text-gray-700">
            Welcome to Engraved, {deceasedUser?.firstName}
          </h1>
        </div>
      )}
      <div className="relative mb-5 overflow-hidden">
        <div
          className={`2xl:container xl:px-6 transition-opacity duration-500 ease-in-out ${
            showTabNavigation ? "opacity-100" : "opacity-0"
          }`}
        >
          <TabNavigation
            data={deceasedUser}
            isLoading={isDeceasedUserLoading}
            weatherTimezone={currentWeather?.timezone}
            sunsetTimestamp={currentWeather?.sys.sunset}
            sunriseTimestamp={currentWeather?.sys.sunrise}
            description={description}
            isWeatherLoading={isWeatherLoading}
          />
        </div>
        <Link to={`/profile/${deceasedUserId}`}>
          <div
            className={`2xl:container xl:px-6 transition-opacity duration-500 ${
              showHeader ? "opacity-100" : "opacity-0"
            }`}
          >
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
              {deceasedUser?.user === userId && (
                <Button className="absolute top-3 left-3 z-20 w-fit h-8 rounded-md flex gap-2 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
                  <Edit size={15} />
                  <span>Edit Profile</span>
                </Button>
              )}

              <div className="overlay bg-gray-900 z-10 absolute opacity-40 top-0 left-0 h-full w-full xl:rounded-md"></div>

              <div className="user-heading flex flex-col gap-2 z-10">
                {isDeceasedUserLoading ? (
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-[350px]" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                ) : (
                  <div className="">
                    <h1 className="text-white text-6xl font-bold">
                      {deceasedUser.firstName} {deceasedUser.lastName}
                    </h1>

                    <h2 className="text-gray-300">
                      {formatDate(deceasedUser.birthDate)} -{" "}
                      {formatDate(deceasedUser.deathDate)} •{" "}
                      {calculateAge(
                        deceasedUser.birthDate,
                        deceasedUser.deathDate
                      )}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>

        <div className="2xl:container md:px-6 px-3 main-section">
          <div className="grid lg:grid-cols-[6fr_3fr] lg:gap-10">
            <div className="feed-view py-3">
              <div
                className={`transition-opacity duration-500 ease-in-out ${
                  showPostMemento ? "opacity-100" : "opacity-0"
                }`}
              >
                <PostMemento deceasedUser={deceasedUser} />
                <div className="py-3 separator">
                  <Separator />
                </div>
                {isDeceasedUserLoading ? (
                  <LoadingHeaderButton />
                ) : (
                  <DeceasedUserButtonHeader
                    firstName={deceasedUser?.firstName}
                  />
                )}
              </div>

              <div
                className={`pinned-section space-y-5 mb-6 transition-opacity duration-500 ${
                  showPinned ? "opacity-100" : "opacity-0"
                }`}
              >
                <h2 className="text-xl font-bold pt-4">Pinned</h2>
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
                <Separator />
              </div>
              <div
                className={`feed-section space-y-6 transition-opacity duration-500 ${
                  showFeed ? "opacity-100" : "opacity-0"
                }`}
              >
                <h2 className="text-xl font-bold mb-[16px]">Feed</h2>
                {deceasedUser?.photos.length > 0 && (
                  <FeedSection
                    content={deceasedUser?.photos}
                    firstName={deceasedUser?.firstName}
                  />
                )}
                {deceasedUser?.pets.length > 0 && (
                  <FeedSection
                    content={deceasedUser?.pets}
                    firstName={deceasedUser?.firstName}
                  />
                )}

                {deceasedUser?.places.length > 0 && (
                  <FeedSection
                    content={deceasedUser?.places}
                    firstName={deceasedUser?.firstName}
                  />
                )}
                <div className="space-y-6">
                  {deceasedUserAlbums?.albums?.map((album: Album) => (
                    <AlbumPreview
                      album={album}
                      isLoading={isDeceasedUserAlbumsLoading}
                    />
                  ))}
                </div>
                <DeceasedUserOwner
                  user={deceasedUser?.user}
                  deceasedUserFirstName={deceasedUser?.firstName}
                  isLoading={isDeceasedUserLoading}
                  deceasedUserRelation={deceasedUser?.userRelation}
                />
              </div>
            </div>
            <div
              className={`wall-view lg:-mt-[300px] z-10 xl:pr-5 space-y-4 transition-opacity duration-500 ${
                showWall ? "opacity-100" : "opacity-0"
              }`}
            >
              <h2
                className={`text-xl font-bold mb-[16px] transition-all duration-1000 ${
                  showHeader ? "text-white" : "text-gray-900"
                }`}
              >
                Wall
              </h2>
              <div className="widget-holder space-y-3">
                <div className="map-weather-component ">
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
                      showWall={showHeader}
                    />
                  )}
                  {/* 
MAKE CUSTOM MAP LOADNIG COMPONENT */}
                  {isDeceasedUserLoading ? (
                    <AspectRatio>
                      <Badge className=" flex gap-2 rounded-md w-fit bg-indigo-900 absolute top-3 left-3 z-10">
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
                      mappedByRelation={deceasedUser?.mappedByRelation}
                    />
                  )}
                </div>
                {deceasedUserAlbums && (
                  <AlbumCarousel
                    albums={deceasedUserAlbums}
                    isLoading={isDeceasedUserAlbumsLoading}
                  />
                )}
              </div>

              {isWallViewLoading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                wallViewContent?.map((content: any) => (
                  <Post
                    isFeed={false}
                    key={content._id}
                    postData={content}
                    showMemento={true}
                  />
                ))
              )}
              {/* Pagination buttons */}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default DeceasedUserPage;
