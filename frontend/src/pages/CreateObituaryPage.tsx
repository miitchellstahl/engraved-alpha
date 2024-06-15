import CreateObituaryForm from "@/forms/Obituary Form/CreateObituaryForm";
import { useMutation, useQuery } from "react-query";
import {
  createMyDeceasedUser,
  getMyDeceasedUser,
  updateMyDeceasedUser,
} from "@/api/MyDeceasedUserApi";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmPinnedForm from "@/forms/Obituary Form/ConfirmPinnedForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CreateObituaryPage = () => {
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("currentStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [deceasedUserId, setDeceasedUserId] = useState<string | null>(() => {
    return localStorage.getItem("deceasedUserId");
  });
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  console.log(deceasedUserId);

  useEffect(() => {
    localStorage.setItem("currentStep", step.toString());
  }, [step]);

  useEffect(() => {
    if (deceasedUserId) {
      localStorage.setItem("deceasedUserId", deceasedUserId);
    }
  }, [deceasedUserId]);

  const { mutate: createDeceasedUser, isLoading: isCreateDeceasedUserLoading } =
    useMutation(createMyDeceasedUser, {
      onSuccess: async (data) => {
        nextStep();
        setDeceasedUserId(data._id);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });

  const { mutate: updateDeceasedUser, isLoading: isUpdateDeceasedUserLoading } =
    useMutation(
      (updateFormData: FormData) =>
        updateMyDeceasedUser(deceasedUserId as string, updateFormData),
      {
        onSuccess: async () => {
          nextStep();
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      }
    );

  const { data: deceasedUser, isLoading: isDeceasedUserLoading } = useQuery(
    ["getDeceasedUser", deceasedUserId],
    () => getMyDeceasedUser(deceasedUserId as string),
    {
      enabled: !!deceasedUserId && step !== 1,
    }
  );

  switch (step) {
    case 1:
      return (
        <div className="container pt-5">
          <Badge className="flex w-fit gap-2 bg-purple-900 hover:bg-purple-800 mb-5">
            {" "}
            <Sparkle size={15} />
            <span>Engraved Obituary Assist</span>
          </Badge>
          <CreateObituaryForm
            onSave={createDeceasedUser}
            isLoading={isCreateDeceasedUserLoading}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
      );
    case 2:
      return (
        <div className="container pt-5">
          <ConfirmPinnedForm
            deceasedUser={deceasedUser}
            isLoading={isUpdateDeceasedUserLoading}
            onSave={updateDeceasedUser}
          />
        </div>
      );
    case 3:
      return (
        <div className="container pt-5">
          <h1>
            WILL PUT PERSONALIZATION HERE... TO DO: MAKE EULOGY SEPARATE
            COLLECTION AND ADD IT AS ARRAY TO DECEASED USER, ALLOW UPLOAD OF
            MULTIPLE EULOGIES
          </h1>
          <Link to={`/profile/${deceasedUserId}`}>
            <Button>Go to {deceasedUser.firstName}'s Profile</Button>
          </Link>
        </div>
      );
    default:
      "default";
  }
};

export default CreateObituaryPage;
