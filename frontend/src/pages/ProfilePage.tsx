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

  return (
    <div className="container px-10 space-y-6 mb-5">
      <div className="w-full bg-purple-300 h-[200px] rounded-t-md p-5">
        {isUserLoading ? (
          <div className="flex flex-col gap-1">
            <Skeleton className="w-[250px] h-4" />
            <Skeleton className="w-[250px] h-4" />
          </div>
        ) : (
          <h1 className="text-gray-900 text-3xl font-bold">
            Hello {user?.name}
          </h1>
        )}
      </div>

      <Tabs defaultValue="obituaries">
        <TabsList>
          <TabsTrigger value="obituaries">My Obituaries</TabsTrigger>
          <TabsTrigger value="edit-profile">Manage Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="obituaries">
          <Separator className="my-2" />
          <div className="grid grid-cols-4 gap-6">
            {deceasedUsers?.length < 1 && (
              <div className="cta flex flex-col">
                <span>No Engraved Profiles - yet!</span>
                <Link className="underline" to="/create-obituary">
                  Create now
                </Link>
              </div>
            )}
            {isDeceasedUserLoading ? (
              <LoadingDeceasedUserCard />
            ) : (
              deceasedUsers?.map((deceasedUser: any) => (
                //create card component
                <DeceasedUserCard
                  key={deceasedUser.id}
                  deceasedUser={deceasedUser}
                  isLoading={isDeceasedUserLoading}
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
  );
};

export default ProfilePage;
