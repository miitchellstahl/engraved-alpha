import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getMyDeceasedUser } from "@/api/MyDeceasedUserApi";
import PinnedDeceasedUserCard from "@/components/PinnedDeceasedUserCard";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingPinnedDeceasedUserCard from "@/components/LoadingPinnedDeceasedUserCard";

const DeceasedUserPage = () => {
  const { deceasedUserId } = useParams();

  if (!deceasedUserId) {
    return <div>Invalid deceased user ID</div>;
  }
  const { data: deceasedUser, isLoading: isDeceasedUserLoading } = useQuery(
    "getDeceasedUser",
    () => getMyDeceasedUser(deceasedUserId as string),
    {}
  );
  console.log(deceasedUser);

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
      <div className="relative mb-5">
        <div className="w-full h-[400px] absolute top-0">
          <div className="bg-purple-400 opacity-30 w-full h-full absolute top-0"></div>
        </div>
        <div className="xl:container mb-[36px]">
          <div className="w-full relative h-[400px] p-5 flex flex-col justify-center">
            {isDeceasedUserLoading ? (
              <Skeleton className="absolute top-0 left-0 w-full object-cover h-full z-0" />
            ) : (
              <img
                src={deceasedUser?.profilePhotoUrl}
                alt=""
                className="absolute top-0 left-0 w-full object-cover h-full z-0"
              />
            )}
            <div className="overlay bg-purple-800 z-10 absolute opacity-45 top-0 left-0 h-full w-full"></div>
            <div className="lg:absolute bg-purple-800 -z-10 opacity-45 top-0 left-0 h-full w-full"></div>
            <div className="user-heading flex flex-col gap-2">
              {isDeceasedUserLoading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-[350px]" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
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
          <div className="grid md:grid-cols-[5fr_3fr] gap-10">
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
            <div className="wall-view">
              <h2 className="text-xl font-bold mb-[16px]">Wall</h2>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default DeceasedUserPage;
