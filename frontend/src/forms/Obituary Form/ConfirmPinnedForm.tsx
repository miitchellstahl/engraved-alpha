import { forwardRef, useImperativeHandle } from "react";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { DeceasedUser } from "@/types";
import { useEffect } from "react";
import OnboardingNavigationMenu from "./OnboardingNavigationMenu";
import { Separator } from "@/components/ui/separator";
import PinnedDeceasedUserCard from "@/components/PinnedDeceasedUserCard";
import EulogyItemInput from "./EulogyItemInput";
import LoadingPinnedDeceasedUserCard from "@/components/LoadingPinnedDeceasedUserCard";
import EditingPinnedDeceasedUserCard from "@/components/EditingPinnedDeceasedUserCard";

type Props = {
  onSave: (formData: FormData) => void;
  isLoading: boolean;
  initialData?: Partial<DeceasedUser> & Record<string, any>;
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

export type ConfirmPinnedFormRef = {
  submitForm: () => void;
};

const ConfirmPinnedForm = forwardRef<ConfirmPinnedFormRef, Props>(
  ({ onSave, initialData }, ref) => {
    const form = useForm<DeceasedUserFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        obituary: initialData?.obituary || "",
        eulogies: initialData?.eulogies || [],
      },
    });

    const {
      fields: eulogyFields,
      append: appendEulogy,
      remove: removeEulogy,
    } = useFieldArray({
      control: form.control,
      name: "eulogies",
    });

    useImperativeHandle(ref, () => ({
      submitForm: form.handleSubmit(onSubmit),
    }));

    useEffect(() => {
      if (initialData) {
        form.reset({
          obituary: initialData.obituary || "",
          eulogies: initialData.eulogies || [],
        });
      }
    }, [initialData, form.reset]);

    const onSubmit = (formDataJson: DeceasedUserFormData) => {
      const formData = new FormData();
      console.log(formDataJson);

      // Add or update obituary and eulogies
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

      onSave(formData);
    };
    return (
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center lg:flex-row gap-6 ">
            {/* <div className="space-y-6 h-fit bg-white p-4 lg:p-6 lg:px-12 rounded-md shadow-base flex-1 onboarding-nav sticky top-[100px]">
              <h2 className="text-3xl font-semibold">To do</h2>
              <OnboardingNavigationMenu
                appendEulogy={appendEulogy}
                eulogyFields={eulogyFields}
                initialData={initialData}
              />
            </div> */}

            <div className="space-y-6 rounded-md shadow-base w-[800px]">
              <FormField
                control={form.control}
                name="obituary"
                render={() => (
                  <FormItem className="flex flex-col gap-2">
                    <EditingPinnedDeceasedUserCard
                      profilePhoto={initialData?.profilePhotoUrl || ""}
                      title={`${initialData?.firstName}'s Obituary` || ""}
                      isLoading={false}
                      name="obituary"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eulogies"
                render={() => (
                  <FormItem className="flex flex-col gap-2">
                    {eulogyFields.map((field, index) => (
                      <EditingPinnedDeceasedUserCard
                        key={field.id}
                        profilePhoto={initialData?.profilePhotoUrl || ""}
                        title={`${initialData?.firstName}'s Obituary` || ""}
                        isLoading={false}
                        name="eulogies"
                        index={index}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <div
                className="hover:opacity-70 cursor-pointer"
                onClick={() =>
                  appendEulogy({
                    eulogySpeech: "",
                    eulogyAuthor: "",
                    eulogyAuthorPhoto: undefined,
                  })
                }
              >
                <LoadingPinnedDeceasedUserCard />
              </div>
              {/* <FormField
                control={form.control}
                name="eulogies"
                render={() => (
                  <FormItem className="flex flex-col gap-2">
                    {[...eulogyFields].reverse().map((field, index) => (
                      <EulogyItemInput
                        key={field.id}
                        index={eulogyFields.length - 1 - index}
                        removeEulogyItem={() => {
                          removeEulogy(eulogyFields.length - 1 - index);
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              /> */}
            </div>
          </div>
        </form>
      </Form>
    );
  }
);

export default ConfirmPinnedForm;
