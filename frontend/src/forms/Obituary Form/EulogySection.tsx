import { FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import EulogyItemInput from "./EulogyItemInput";
import { Button } from "../../components/ui/button";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { InfoIcon } from "lucide-react";

const EulogySection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "eulogies",
  });
  return (
    <div className="space-y-2">
      <FormField
        control={control}
        name="eulogies"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <EulogyItemInput
                key={_.id}
                index={index}
                removeEulogyItem={() => {
                  remove(index);
                }}
              />
            ))}
          </FormItem>
        )}
      />
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() =>
            append({
              eulogySpeech: "",
              eulogyAuthor: "",
              eulogyAuthorPhoto: null,
            })
          }
        >
          Add Eulogy
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" className="p-2">
                <InfoIcon size={20} className="text-gray-400" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>You can always add this later</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default EulogySection;
