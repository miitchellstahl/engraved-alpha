import { getMyUser } from "@/api/MyUserApi";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditProfileForm from "@/forms/Edit Profile Form/EditProfileForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { updateMyUser } from "@/api/MyUserApi";
import { getMyDeceasedUsers } from "@/api/MyDeceasedUserApi";
import DeceasedUserCard from "@/components/DeceasedUserCard";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingDeceasedUserCard from "@/components/LoadingDeceasedUserCard";
import { Helmet } from "react-helmet";
import Logo from "@/assets/IconLogo.svg";

interface OnboardingUser {
  _id: string;
  formData: any; // Replace 'any' with a more specific type if possible
  currentStep: number;
}

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useQuery(
    "getUser",
    getMyUser,
    {}
  );
  const { data: deceasedUsers, isLoading: isDeceasedUserLoading } = useQuery(
    "getDeceasedUsers",
    getMyDeceasedUsers,
    {}
  );

  console.log(deceasedUsers);

  const { mutate: updateUser, isLoading: isUpdateLoading } = useMutation(
    updateMyUser,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("getUser");
        toast.success("Profile updated");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  console.log(user);

  return (
    <div className="2xl:container space-y-6">
      <Helmet>
        <title>{`${user?.name}'s Profile | Engraved Memorials`}</title>
        <link rel="icon" href={Logo} />
      </Helmet>
      <div className="w-full h-[250px] p-5 relative overflow-hidden flex justify-center items-center">
        <img
          src={user?.imageUrl}
          className="absolute w-full h-full object-cover top-0 left-0 -z-10 blur-3xl opacity-75 pointer-events-none"
          alt=""
          draggable="false"
        />
        {isUserLoading ? (
          <div className="flex flex-col gap-1">
            <Skeleton className="w-[250px] h-4" />
            <Skeleton className="w-[250px] h-4" />
          </div>
        ) : (
          <div className="flex gap-6 items-center">
            <img
              src={user?.imageUrl}
              alt=""
              className="h-20 w-20 object-cover rounded-full shadow-sm"
              draggable="false"
            />
            <h1 className="text-gray-900 text-3xl font-bold">
              Hello, {user?.name}
            </h1>
          </div>
        )}
      </div>

      <div className="2xl:container md:px-6 px-3">
        <Tabs defaultValue="obituaries">
          <TabsList>
            <TabsTrigger value="obituaries">My Obituaries</TabsTrigger>
            <TabsTrigger value="edit-profile">Manage Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="obituaries">
            <Separator className="my-2" />
            <div className="grid grid-cols-4 gap-6 items-end">
              {deceasedUsers?.length < 1 &&
                user?.onboardingUsers?.length < 1 && (
                  <div className="cta flex flex-col">
                    <span>No Engraved Profiles - yet!</span>
                    <Link className="underline" to="/create-obituary">
                      Create now
                    </Link>
                  </div>
                )}
              {user?.onboardingUsers?.map((onboardingUser: OnboardingUser) => (
                <DeceasedUserCard
                  key={onboardingUser._id}
                  deceasedUser={{
                    ...onboardingUser.formData,
                    currentStep: onboardingUser.currentStep,
                    _id: onboardingUser._id,
                  }}
                  isUnfinished={true}
                />
              ))}
              {isDeceasedUserLoading ? (
                <LoadingDeceasedUserCard />
              ) : (
                deceasedUsers?.map((deceasedUser: any) => (
                  //create card component
                  <DeceasedUserCard
                    key={deceasedUser.id}
                    deceasedUser={deceasedUser}
                  />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="edit-profile">
            <Separator className="my-2" />
            <EditProfileForm
              user={user}
              onSave={updateUser}
              isLoading={isUpdateLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
