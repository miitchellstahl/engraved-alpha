import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnboardingData } from "@/types";
import Logo from "@/assets/IconLogo.svg";

import CreateObituaryForm, {
  CreateObituaryFormRef,
} from "@/forms/Obituary Form/CreateObituaryForm";
import ConfirmPinnedForm, {
  ConfirmPinnedFormRef,
} from "@/forms/Obituary Form/ConfirmPinnedForm";
import PersonalizeObituaryForm from "@/forms/Obituary Form/PersonalizeObituaryForm";
import { PersonalizeFormRef } from "@/forms/Obituary Form/PersonalizeObituaryForm";

import {
  getOnboardingProgress,
  saveOnboardingProgress,
  completeOnboarding,
} from "@/api/MyDeceasedUserApi";
import LoadingButton from "@/components/LoadingButton";
import OnboardingProgress from "@/components/OnboardingProgress";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LoadingHeaderButton from "@/components/LoadingHeaderButton";
import LoadingPinnedDeceasedUserCard from "@/components/LoadingPinnedDeceasedUserCard";
import PinnedDeceasedUserCard from "@/components/PinnedDeceasedUserCard";
import { Helmet } from "react-helmet";
import HoldButton from "@/components/HoldButton";

const CreateObituaryPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { onboardingId } = useParams<{ onboardingId?: string }>();
  const createObituaryFormRef = React.useRef<CreateObituaryFormRef>(null);
  const confirmPinnedFormRef = React.useRef<ConfirmPinnedFormRef>(null);
  const personalizeFormRef = React.useRef<PersonalizeFormRef>(null);

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const steps = [
    { number: 1, label: "Obituary Creation" },
    { number: 2, label: "Confirm Details" },
    { number: 3, label: "Personalize" },
  ];

  console.log(onboardingId);

  const { isLoading: isLoadingOnboardingData } = useQuery(
    ["onboardingProgress", onboardingId],
    () => (onboardingId ? getOnboardingProgress(onboardingId) : null),
    {
      enabled: !!onboardingId,
      onSuccess: (data: OnboardingData | null) => {
        if (data) {
          setStep(data.currentStep);
          setFormData(data.formData);
        }
      },
    }
  );

  // Reset state when there's no onboardingId
  useEffect(() => {
    if (!onboardingId) {
      setStep(1);
      setFormData({});
    }
  }, [onboardingId]);

  const { mutate: saveProgress, isLoading: isSavingProgress } = useMutation(
    (data: FormData) => saveOnboardingProgress(data),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries("getUser");
        setStep(data.onboarding.currentStep);
        setFormData(data.onboarding.formData);
        if (!onboardingId) {
          navigate(`/create/${data.onboarding.onboardingId}`);
        }
      },
      onError: (error: Error) => {
        console.error("Failed to save progress:", error);
        toast.error(error.message);
      },
    }
  );

  const { mutate: finishOnboarding, isLoading: isFinishingOnboarding } =
    useMutation((data: FormData) => completeOnboarding(data), {
      onSuccess: async (data: { deceasedUserId: string }) => {
        await queryClient.invalidateQueries("getUser");
        navigate(`/profile/${data.deceasedUserId}?newProfile=true`);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const handleSave = (formData: FormData) => {
    if (onboardingId) {
      formData.append("onboardingId", onboardingId);
    }

    formData.append("currentStep", step.toString());

    if (step === 3) {
      console.log("Work on this");
      //have to allow this to accept formData as a parameter
      finishOnboarding(formData);
      return;
    }

    saveProgress(formData);
  };

  const handleNext = () => {
    console.log(step);
    if (step === 1 && createObituaryFormRef.current) {
      createObituaryFormRef.current.submitForm();
    } else if (step === 2 && confirmPinnedFormRef.current) {
      confirmPinnedFormRef.current.submitForm();
    } else if (step === 3 && personalizeFormRef.current) {
      console.log("here");
      personalizeFormRef.current.submitForm();
    }
  };

  // Show loading state only when fetching existing onboarding data
  if (isLoadingOnboardingData && onboardingId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-5 space-y-6">
      {step === 3 && formData && (
        <Helmet>
          <title>{`Personalize ${formData.firstName}'s Profile | Engraved Memorial Creation`}</title>
          <link rel="icon" href={Logo} />
        </Helmet>
      )}

      <div className="w-full overflow-hidden h-[250px] p-3 flex items-center justify-center relative select-none">
        {step === 1 ? (
          <img
            src={formData?.profilePhotoUrl}
            className="absolute w-full h-full object-cover top-0 left-0 -z-10 blur-3xl opacity-75 pointer-events-none"
            alt=""
            draggable="false"
          />
        ) : (
          <img
            src={formData?.profilePhotoUrl}
            className="absolute w-full h-full object-cover top-0 left-0 -z-10 blur-3xl opacity-75 overflow-y-hidden pointer-events-none"
            alt=""
            draggable="false"
          />
        )}
        {/* <div className="absolute top-0 left-0 w-full h-full">
          <img
            src={BannerOverlay}
            alt=""
            className="w-full h-full object-cover"
          />
        </div> */}
        <div className="absolute top-5 left-5 z-10">
          <Badge className="flex w-fit gap-2 bg-gray-100 bg-opacity-80 hover:bg-gray-100 mb-5 rounded-sm">
            <Sparkle size={15} className="text-gray-900 " />
            <span className="text-gray-900">Engraved Obituary Assist</span>
          </Badge>
        </div>
        <div className="text flex flex-col gap-3 z-10">
          <h1 className="text-5xl font-bold text-center text-gray-900 opacity-75">
            {step === 2 && `Tell us about ${formData?.firstName}`}
            {step === 3 && `Personalize ${formData?.firstName}'s Profile`}
          </h1>
          <h1 className="text-xl text-center text-gray-900 opacity-50">
            {step === 2 && `We'll guide you to a beautiful memorial page`}
            {step === 3 &&
              `Add photos, videos, places, albums: this is where you show what ${formData?.firstName} was all about`}
          </h1>
        </div>
      </div>
      <div className="2xl:container px-6 2xl:px-0 space-y-6">
        <OnboardingProgress currentStep={step} steps={steps} />
        <Separator />
        <div className="grid lg:grid-cols-[6fr_3fr] gap-10">
          <div className="">
            {step === 1 && (
              <CreateObituaryForm
                ref={createObituaryFormRef}
                onSave={handleSave}
                initialData={formData}
              />
            )}
            {step === 2 && (
              <ConfirmPinnedForm
                ref={confirmPinnedFormRef}
                isLoading={isSavingProgress}
                onSave={handleSave}
                initialData={formData}
              />
            )}
            {step === 3 && (
              <PersonalizeObituaryForm
                ref={personalizeFormRef}
                onSave={handleSave}
                initialData={formData}
              />
            )}
          </div>
          <div className="">
            <span className="font-semibold text-md">
              This is what the profile will look like:
            </span>

            <div className="w-full bg-indigo-100 p-4 border-xl overflow-y-scroll h-[500px] blur-4xl">
              <div className="inner-card bg-gray-100 border-lg h-full overflow-y-scroll p-3 space-y-3 ">
                <div className="top-card ">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={formData?.profilePhotoUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>

                  <div className="header font-bold text-xl">
                    {formData?.firstName} {formData?.lastName}
                  </div>
                </div>
                <LoadingHeaderButton />
                {step > 1 && (
                  <PinnedDeceasedUserCard
                    profilePhoto={formData?.profilePhotoUrl}
                    title={
                      formData?.firstName +
                      " " +
                      formData?.lastName +
                      "'s Obituary"
                    }
                    content={formData?.obituary}
                    isLoading={isLoadingOnboardingData}
                  />
                )}

                <LoadingPinnedDeceasedUserCard />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {step < steps.length ? (
            isSavingProgress ? (
              <LoadingButton>Engraving...</LoadingButton>
            ) : (
              <Button
                className="h-full rounded-md flex bg-indigo-300 select-none"
                onClick={handleNext}
              >
                {step === 1 ? "Generate Obituary" : "Next"}
              </Button>
            )
          ) : isFinishingOnboarding ? (
            <LoadingButton>
              Creating {formData?.firstName}'s' profile...
            </LoadingButton>
          ) : (
            <HoldButton onActivate={handleNext} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateObituaryPage;
