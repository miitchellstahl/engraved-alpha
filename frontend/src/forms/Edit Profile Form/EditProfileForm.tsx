import LoadingButton from "@/components/LoadingButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  user?: User;
  onSave: (EditFormData: FormData) => void;
  isLoading: boolean;
};

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  imageUrl: z.string().optional(),
  email: z.string().optional(),
});

type EditFormData = z.infer<typeof formSchema>;

const EditProfileForm = ({ user, onSave, isLoading }: Props) => {
  const form = useForm<EditFormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    form.reset(user);
  }, [form, user]);

  const onSubmit = (formDataJson: EditFormData) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }
    console.log(formDataJson.imageFile);
    onSave(formData);
  };

  const existingImageUrl = form.watch("imageUrl");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="">
          {" "}
          <h2>Edit profile</h2>
          <FormDescription>
            Please change your profile and add a profile photo
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="email"
          disabled={true}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {existingImageUrl && (
          <AspectRatio ratio={1 / 1}>
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}

        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
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
        {isLoading ? <LoadingButton /> : <Button>Save Profile</Button>}
      </form>
    </Form>
  );
};

export default EditProfileForm;
