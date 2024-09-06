import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { User } from "@/types";
import { Plus, ShieldPlus } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useContext } from "react";
import { UserContext } from "@/UserContext";

const MemorializeButton = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {!user ? (
        <Skeleton className="w-20 h-3" />
      ) : user?.onboardingUsers?.length === 1 ? (
        <div className="flex gap-2">
          <Link to={`/create/${user?.onboardingUsers?.[0]?._id}`}>
            <Button className="w-30 h-full rounded-md flex bg-0 text-gray-900 hover:bg-gray-200">
              <div className="flex gap-2 items-center">
                <img
                  src={user?.onboardingUsers?.[0]?.formData?.profilePhotoUrl}
                  className={`w-6 h-6 rounded-sm`}
                  alt=""
                />
                <span>
                  {" "}
                  Finish {user?.onboardingUsers?.[0]?.formData?.firstName}'s
                  Profile
                </span>
              </div>
            </Button>
          </Link>
          <Link to={"/select"}>
            <Button className="rounded-md flex bg-0 text-gray-900 hover:bg-gray-200">
              <div className="">
                <ShieldPlus size={18} />
              </div>
            </Button>
          </Link>
        </div>
      ) : user?.onboardingUsers?.length > 1 ? (
        <div className="flex gap-2">
          <Link to="/create/users">
            <Button className="w-30 h-full bg-0 rounded-md flex text-gray-900 hover:bg-gray-200 group">
              <div className="flex gap-2 items-center">
                <div className="flex ">
                  {user?.onboardingUsers?.map((onboardingUser: any) => (
                    <img
                      key={onboardingUser._id}
                      src={onboardingUser?.formData?.profilePhotoUrl}
                      className="w-6 h-6 rounded-sm -ml-2 border-2 border-gray-100 group-hover:border-gray-200"
                      alt=""
                    />
                  ))}
                </div>
                <span>{user?.onboardingUsers?.length} unfinished profiles</span>
              </div>
            </Button>
          </Link>
          <Link to={"/select"}>
            <Button className="rounded-md flex bg-0 text-gray-900 hover:bg-gray-200">
              <div className="">
                <Plus size={18} />
              </div>
            </Button>
          </Link>
        </div>
      ) : (
        <Link to={"/select"}>
          <Button className="w-30 h-full bg-0 rounded-md flex text-gray-900 hover:bg-gray-200">
            Memorialze Someone
          </Button>
        </Link>
      )}
    </>
  );
};

export default MemorializeButton;
