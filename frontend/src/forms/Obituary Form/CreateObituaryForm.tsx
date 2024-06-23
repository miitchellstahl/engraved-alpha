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
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LocationDropDownSection from "./LocationDropDownSection";

type Props = {
  onSave: (DeceasedUserFormData: FormData) => void;
  isLoading: boolean;
  nextStep: () => void;
  prevStep: () => void;
};

const formSchema = z.object({
  firstName: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  lastName: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  birthDate: z.date({ required_error: "Birth date is required" }),
  deathDate: z.date({ required_error: "Death date is required" }),
  cityBorn: z
    .string({ required_error: "City born is required" })
    .min(1, "Name is required"),
  cityDied: z
    .string({ required_error: "City died is required" })
    .min(1, "Name is required"),
  stateBorn: z
    .string({ required_error: "State born is required" })
    .min(1, "Name is required"),
  stateDied: z
    .string({ required_error: "State died is required" })
    .min(1, "Name is required"),
  obituary: z.string().optional(),
  cityDiedLongitude: z.string().optional(),
  cityDiedLatitude: z.string().optional(),
  cityBornLatitude: z.string().optional(),
  cityBornLongitude: z.string().optional(),
  profilePhoto: z.instanceof(File, { message: "Image is required" }).optional(),
  profilePhotoUrl: z.string().optional(),
  survivors: z.string().optional(),
  education: z.string().optional(),
  career: z.string().optional(),
  preDeceased: z.string().optional(),
  personality: z.string().optional(),
});

type DeceasedUserFormData = z.infer<typeof formSchema>;

const CreateObituaryForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<DeceasedUserFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (formDataJson: DeceasedUserFormData) => {
    const formData = new FormData();

    formData.append("firstName", formDataJson.firstName);
    formData.append("lastName", formDataJson.lastName);
    formData.append("birthDate", formDataJson.birthDate.toISOString());
    formData.append("deathDate", formDataJson.deathDate.toISOString());
    formData.append("cityBorn", formDataJson.cityBorn);
    formData.append("cityDied", formDataJson.cityDied);
    formData.append("stateBorn", formDataJson.stateBorn);
    formData.append("stateDied", formDataJson.stateDied);

    if (formDataJson.cityBornLongitude) {
      formData.append("cityBornLongitude", formDataJson.cityBornLongitude);
    }
    if (formDataJson.cityBornLatitude) {
      formData.append("cityBornLatitude", formDataJson.cityBornLatitude);
    }
    if (formDataJson.cityDiedLatitude) {
      formData.append("cityDiedLatitude", formDataJson.cityDiedLatitude);
    }
    if (formDataJson.cityDiedLongitude) {
      formData.append("cityDiedLongitude", formDataJson.cityDiedLongitude);
    }

    if (formDataJson.profilePhoto) {
      formData.append("profilePhoto", formDataJson.profilePhoto);
    }
    if (formDataJson.survivors) {
      formData.append("survivors", formDataJson.survivors);
    }
    if (formDataJson.preDeceased) {
      formData.append("preDeceased", formDataJson.preDeceased);
    }
    if (formDataJson.education) {
      formData.append("education", formDataJson.education);
    }
    if (formDataJson.career) {
      formData.append("career", formDataJson.career);
    }
    console.log(formDataJson);

    onSave(formData);
  };
  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="new-password"
      >
        <div className="">
          {" "}
          <h2>Create obituary</h2>
          <FormDescription>
            Please tell us about the individual, and we will generate an
            obituary for you.
          </FormDescription>
        </div>

        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-6 items-start">
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  It's okay if you have to estimate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deathDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of death</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  It's okay if you have to estimate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <div className="flex gap-6">
          <FormField
            control={form.control}
            name="cityBorn"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City Born</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stateBorn"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>State born</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityDied"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City Died</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stateDied"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>State died</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}

        <LocationDropDownSection />

        <FormField
          control={form.control}
          name="survivors"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex gap-2 items-center justify-between">
                <FormLabel>Surviving family members</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" className="p-2">
                        <InfoIcon size={20} className="text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ex: Mike Smith: Brother, Jason Smith: Son</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Provide a name, relationship for each surviving family member."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preDeceased"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex gap-2 items-center justify-between">
                <FormLabel>Predeceased family members</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" className="p-2">
                        <InfoIcon size={20} className="text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ex: Anna Smith: Mother, John Smith: Father</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormControl>
                <Textarea
                  placeholder="Provide a name, relationship for each predeceased family member."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex gap-2 items-center justify-between">
                <FormLabel>Education</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" className="p-2">
                        <InfoIcon size={20} className="text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Ex: High School: Marjory Stoneman Douglas High, College:
                        Florida State University
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormControl>
                <Textarea
                  placeholder="Tell us about their educational background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="career"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex gap-2 items-center justify-between">
                <FormLabel>Career</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" className="p-2">
                        <InfoIcon size={20} className="text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ex: Software developer</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormControl>
                <Textarea placeholder="Tell us about their career" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personality"
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex gap-2 items-center justify-between">
                <FormLabel>What were they like?</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline" className="p-2">
                        <InfoIcon size={20} className="text-gray-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Ex: John loved to spend time with his grandson and loved
                        the ball game, etc...
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <FormControl>
                <Textarea placeholder="Tell us about them" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="image">
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Profile Photo</FormLabel>
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
        {isLoading ? <LoadingButton /> : <Button>Generate Obituary</Button>}
      </form>
    </Form>
  );
};

export default CreateObituaryForm;
