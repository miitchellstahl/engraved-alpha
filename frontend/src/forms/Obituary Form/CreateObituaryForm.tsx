import { forwardRef, useImperativeHandle, useState } from "react";
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
import {
  Book,
  CalendarIcon,
  HardHat,
  InfoIcon,
  Palette,
  UsersRound,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LocationDropDownSection from "./LocationDropDownSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { relations } from "../../configs/relationConfig";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FileInput from "@/components/FileInput";

type Props = {
  onSave: (formData: FormData) => void;
  initialData?: Record<string, any>;
};

export type CreateObituaryFormRef = {
  submitForm: () => void;
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
  userRelation: z
    .string({ required_error: "Relation is required" })
    .min(1, "Relation is required"),
  obituary: z.string().optional(),
  cityDiedLongitude: z.string().optional(),
  cityDiedLatitude: z.string().optional(),
  cityBornLatitude: z.string().optional(),
  cityBornLongitude: z.string().optional(),
  profilePhoto: z.instanceof(File, { message: "Image is required" }),
  profilePhotoUrl: z.string().optional(),
  survivors: z.string().optional(),
  education: z.string().optional(),
  career: z.string().optional(),
  preDeceased: z.string().optional(),
  personality: z.string().optional(),
});

type DeceasedUserFormData = z.infer<typeof formSchema>;

const CreateObituaryForm = forwardRef<CreateObituaryFormRef, Props>(
  ({ onSave, initialData }, ref) => {
    useImperativeHandle(ref, () => ({
      submitForm: form.handleSubmit(onSubmit),
    }));
    const form = useForm<DeceasedUserFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        ...initialData,
        birthDate: initialData?.birthDate
          ? new Date(initialData.birthDate)
          : undefined,
        deathDate: initialData?.deathDate
          ? new Date(initialData.deathDate)
          : undefined,
      },
    });

    const [birthDateOpen, setBirthDateOpen] = useState(false);
    const [deathDateOpen, setDeathDateOpen] = useState(false);

    const onSubmit = (formDataJson: DeceasedUserFormData) => {
      const formData = new FormData();

      console.log(formDataJson);

      Object.entries(formDataJson).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

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
            <h2 className="text-xl font-bold">
              Let's create an obituary together
            </h2>
            <FormDescription className="text-gray-700">
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
          <FormField
            control={form.control}
            name="userRelation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your relation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {relations.map((relation) => (
                      <SelectItem key={relation} value={relation}>
                        {relation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6 items-start">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Birth Date</FormLabel>
                  <Popover open={birthDateOpen} onOpenChange={setBirthDateOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full font-normal",
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
                        captionLayout="dropdown"
                        selected={field.value}
                        onSelect={field.onChange}
                        fromYear={1800}
                        toYear={new Date().getFullYear()}
                        onDayClick={() => setBirthDateOpen(false)}
                        disabled={(date) => date > new Date()}
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
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Death Date</FormLabel>
                  <Popover open={deathDateOpen} onOpenChange={setDeathDateOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full font-normal",
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
                        captionLayout="dropdown"
                        selected={field.value}
                        onSelect={field.onChange}
                        fromYear={1800}
                        toYear={new Date().getFullYear()}
                        onDayClick={() => setDeathDateOpen(false)}
                        disabled={(date) => date > new Date()}
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

          <LocationDropDownSection />

          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1" className="bg-indigo-100 rounded-md">
              <AccordionTrigger className="flex gap-4 bg-indigo-200 rounded-md px-6">
                <div className="flex gap-2 items-center">
                  <UsersRound size={18} className="text-indigo-900" />
                  <span className="text-indigo-900">Family</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 flex flex-col gap-4">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1" className="bg-indigo-100 rounded-md">
              <AccordionTrigger className="flex gap-4 bg-indigo-200 rounded-md px-6">
                <div className="flex gap-2 items-center">
                  <Book size={18} className="text-indigo-900" />
                  <span className="text-indigo-900">Education</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 flex flex-col gap-4">
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
                                Ex: High School: Marjory Stoneman Douglas High,
                                College: Florida State University
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1" className="bg-indigo-100 rounded-md">
              <AccordionTrigger className="flex gap-4 bg-indigo-200 rounded-md px-6">
                <div className="flex gap-2 items-center">
                  <HardHat size={18} className="text-indigo-900" />
                  <span className="text-indigo-900">Career</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 flex flex-col gap-4">
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
                        <Textarea
                          placeholder="Tell us about their career"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1" className="bg-indigo-100 rounded-md">
              <AccordionTrigger className="flex gap-4 bg-indigo-200 rounded-md px-6">
                <div className="flex gap-2 items-center">
                  <Palette size={18} className="text-indigo-900" />
                  <span className="text-indigo-900">Personality</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 flex flex-col gap-4">
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
                                Ex: John loved to spend time with his grandson
                                and loved the ball game, etc...
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FileInput name="profilePhoto" />
        </form>
      </Form>
    );
  }
);

export default CreateObituaryForm;
