import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InfoIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeceasedUser } from "@/types";
import { useEffect } from "react";
import EulogySection from "./EulogySection";
import { Separator } from "@/components/ui/separator";

type Props = {
  onSave: (DeceasedUserFormData: FormData) => void;
  isLoading: boolean;
  deceasedUser?: DeceasedUser;
};

const formSchema = z.object({
  obituary: z
    .string({ required_error: "Obituary is required" })
    .min(1, "Name is required"),
  eulogies: z.array(
    z.object({
      eulogySpeech: z.string().optional(),
      eulogyAuthor: z.string().optional(),
      eulogyAuthorPhoto: z
        .instanceof(File, { message: "Image is required" })
        .optional(),
    })
  ),
});

type DeceasedUserFormData = z.infer<typeof formSchema>;

const ConfirmPinnedForm = ({ onSave, isLoading, deceasedUser }: Props) => {
  const form = useForm<DeceasedUserFormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    form.reset(deceasedUser);
  }, [deceasedUser, form.reset]);

  const onSubmit = (formDataJson: DeceasedUserFormData) => {
    const formData = new FormData();

    formData.append("obituary", formDataJson.obituary);

    if (formDataJson.eulogies) {
      formDataJson.eulogies.forEach((eulogy, index) => {
        if (eulogy.eulogySpeech) {
          formData.append(
            `eulogies[${index}][eulogySpeech]`,
            eulogy.eulogySpeech
          );
        }
        if (eulogy.eulogyAuthor) {
          formData.append(
            `eulogies[${index}][eulogyAuthor]`,
            eulogy.eulogyAuthor
          );
        }
        if (
          eulogy.eulogyAuthorPhoto &&
          eulogy.eulogyAuthorPhoto instanceof File
        ) {
          formData.append(
            `eulogies[${index}][eulogyAuthorPhoto]`,
            eulogy.eulogyAuthorPhoto
          );
        }
      });
    }
    console.log(formDataJson);

    onSave(formData);
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="">
          {" "}
          <h2>Basic Info</h2>
          <FormDescription>
            Now that the obituary has been generated, edit it as you wish, add
            more sections if you'd like
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="obituary"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex gap-2 items-center justify-between">
                <FormLabel>Obituary</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" className="p-2">
                        <InfoIcon size={20} className="text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Change the obituary however you'd like to</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormControl>
                <Textarea className="overflow-hidden h-[300px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <EulogySection />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button>
            {" "}
            Save & Personalize {deceasedUser?.firstName}'s' Profile
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ConfirmPinnedForm;
