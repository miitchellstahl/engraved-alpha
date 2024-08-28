import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type step = {
  number: number;
  label: string;
};

type Props = {
  currentStep: number;
  steps: step[];
};

const OnboardingProgress = ({ currentStep, steps }: Props) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex-grow overflow-x-auto">
        <div className="flex gap-2 md:gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex w-10 md:w-60 h-10 px-2 md:px-3 gap-1 rounded-md shadow-sm items-center ${
                currentStep === step.number
                  ? "text-indigo-900 bg-white outline outline-gray-200 outline-1"
                  : "text-gray-400 bg-gray-200"
              }`}
            >
              <div
                className={`rounded-full h-6 w-6 text-xs flex items-center justify-center
            ${currentStep === step.number ? "bg-indigo-100" : "bg-white"}`}
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

      <Button className=" w-fit h-10 rounded-md flex-shrink-0 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
        Save for later
      </Button>
    </div>
  );
};

export default OnboardingProgress;
