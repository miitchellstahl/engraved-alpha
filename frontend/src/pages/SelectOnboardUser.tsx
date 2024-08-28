import BannerOverlay from "../assets/CreateBanner.png";
import { useQuery } from "react-query";
import { getMyUser } from "@/api/MyUserApi";
import DeceasedUserCard from "@/components/DeceasedUserCard";

interface OnboardingUser {
  _id: string;
  formData: any;
  currentStep: number;
}

const SelectOnboardUser = () => {
  const { data: user } = useQuery("getUser", getMyUser, {});
  return (
    <div className="2xl:container space-y-6">
      {" "}
      <div className="w-full bg-gray-200 h-[250px] p-3 flex items-center justify-center relative ">
        <div className="absolute top-0 left-0 w-full h-full select-none pointer-events-none">
          <img
            src={BannerOverlay}
            alt=""
            className="w-full h-full object-cover pointer-events-none"
            draggable="false"
          />
        </div>
        <div className="text flex flex-col gap-3">
          <h1 className="text-5xl font-bold text-center text-gray-900">
            Finish their profile
          </h1>
          <h1 className="text-xl text-center text-gray-900">
            Pick up where you left off blah blah blah
          </h1>
        </div>
      </div>
      <div className="obituary-options grid grid-cols-4 gap-6 justify-between px-6 2xl:p-0">
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
      </div>
    </div>
  );
};

export default SelectOnboardUser;
