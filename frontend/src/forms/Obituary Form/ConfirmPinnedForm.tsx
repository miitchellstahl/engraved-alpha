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

type Props = {
  onSave: (DeceasedUserFormData: FormData) => void;
  isLoading: boolean;
  deceasedUser?: DeceasedUser;
};

const formSchema = z.object({
  obituary: z
    .string({ required_error: "Obituary is required" })
    .min(1, "Name is required"),
  eulogy: z.string().optional(),
  eulogyAuthor: z.string().optional(),
  eulogyAuthorPhoto: z
    .instanceof(File, { message: "Image is required" })
    .optional(),
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

    if (formDataJson.eulogyAuthorPhoto) {
      formData.append("eulogyAuthorPhoto", formDataJson.eulogyAuthorPhoto);
    }
    if (formDataJson.eulogy) {
      formData.append("eulogy", formDataJson.eulogy);
    }
    if (formDataJson.eulogyAuthor) {
      formData.append("eulogyAuthor", formDataJson.eulogyAuthor);
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
        <FormField
          control={form.control}
          name="eulogy"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex gap-2 items-center justify-between">
                <FormLabel>Add a eulogy speech</FormLabel>
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

              <FormControl>
                <Textarea placeholder="Provide a eulogy speech." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eulogyAuthor"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex gap-2 items-center justify-between">
                <FormLabel>Name of eulogy author</FormLabel>
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

              <FormControl>
                <Input placeholder="Who wrote this eulogy?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="image">
          <FormField
            control={form.control}
            name="eulogyAuthorPhoto"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Eulogy Photo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
