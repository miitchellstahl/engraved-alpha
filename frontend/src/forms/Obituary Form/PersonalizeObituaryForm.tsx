import { forwardRef, useImperativeHandle } from "react";
import { Form, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileInput from "@/components/FileInput";
import EulogySection from "./OnboardingNavigationMenu";

type Props = {
  onSave: (formData: FormData) => void;
  initialData?: Record<string, any>;
};

export type PersonalizeFormRef = {
  submitForm: () => void;
};

const formSchema = z.object({
  photos: z.array(z.instanceof(File)).optional(),
});

type DeceasedUserFormData = z.infer<typeof formSchema>;

const PersonalizeObituaryForm = forwardRef<PersonalizeFormRef, Props>(
  ({ onSave, initialData }, ref) => {
    useImperativeHandle(ref, () => ({
      submitForm: form.handleSubmit(onSubmit),
    }));
    const form = useForm<DeceasedUserFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        photos: [],
      },
    });

    const onSubmit = (formDataJson: DeceasedUserFormData) => {
      const formData = new FormData();

      if (formDataJson.photos && formDataJson.photos.length > 0) {
        formDataJson.photos.forEach((photo) => {
          formData.append(`photos`, photo);
        });
      }

      onSave(formData);
    };

    return (
      <Form {...form}>
        <form
          className="space-y-6  shadow-base"
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="new-password"
        >
          <div className="bg-white p-6 px-12 rounded-md">
            {" "}
            <h2 className="font-bold text-xl">Personalize</h2>
            <FormDescription>
              Add some photos of {initialData?.firstName} to get their profile
              started
            </FormDescription>
            {/* File Input */}
            <FileInput singlePhoto={false} />
          </div>
          <div className="bg-white p-6 px-12 rounded-md">flk</div>
        </form>
      </Form>
    );
  }
);

export default PersonalizeObituaryForm;
