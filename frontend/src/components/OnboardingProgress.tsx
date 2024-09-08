import { ChevronRight } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import HoldButton from "./HoldButton";

type step = {
  number: number;
  label: string;
};

type Props = {
  currentStep: number;
  steps: step[];
  isSaving: boolean;
  handleNext: () => void;
};

const OnboardingProgress = ({
  currentStep,
  steps,
  isSaving,
  handleNext,
}: Props) => {
  return (
    <div className="relative overflow-hidden shadow-md bg-white">
      {/* <div className="absolute top-0 left-0 h-[300px] inset-0 bg-gray-300 bg-opacity-90"></div> */}
      <div className="relative 2xl:container px-6 py-3 2xl:px-0 flex flex-row items-center gap-4">
        <div className="p-2 px-4  bg-white rounded-md font-bold text-sm">
          $64.99
        </div>
        <Separator orientation="vertical" className="h-9" />
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-2 md:gap-4 items-center">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex w-10 md:w-60 h-10 px-2 md:px-3 gap-1 rounded-md shadow-sm items-center ${
                  currentStep === step.number
                    ? "text-purple-900 bg-white outline outline-gray-200 outline-1"
                    : "text-gray-400 bg-gray-100"
                }`}
              >
                <div
                  className={`rounded-full h-6 w-6 text-xs flex items-center justify-center
            ${currentStep === step.number ? "bg-purple-100" : "bg-white"}`}
                >
                  {step.number}
                </div>
                <span
                  className={`hidden md:inline ml-2 text-sm ${
                    currentStep === step.number
                      ? "text-gray-900"
                      : "text-gray-600"
                  }`}
                >
                  {step.label}
                </span>
                {currentStep === step.number && (
                  <ChevronRight
                    size={15}
                    className="text-gray-900 ml-1 hidden md:inline"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="">
          {currentStep < steps.length ? (
            isSaving ? (
              <LoadingButton>Engraving...</LoadingButton>
            ) : (
              <div className="flex gap-4">
                <Button
                  className="h-full rounded-md flex bg-indigo-300 select-none"
                  onClick={handleNext}
                >
                  {currentStep === 1 ? "Generate Obituary" : "Next"}
                </Button>
              </div>
            )
          ) : isSaving ? (
            <LoadingButton>Creating profile...</LoadingButton>
          ) : (
            <HoldButton onActivate={handleNext} />
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default OnboardingProgress;
