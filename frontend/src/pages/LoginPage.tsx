import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMyUser } from "../api/MyUserApi";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";
import { useQueryClient } from "react-query";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

type LoginForm = z.infer<typeof formSchema>;

const LoginPage = () => {
  const queryClient = useQueryClient();
  const [redirect, setRedirect] = useState(false);
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: loginUser, isLoading: isLoginUserLoading } =
    useLoginMyUser();

  const onSubmit = async (formData: LoginForm) => {
    await loginUser(formData);
    await queryClient.invalidateQueries("validateToken");
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow w-full flex items-center justify-center">
      <Form {...form}>
        {" "}
        <div className="flex w-full flex-col gap-5 -mt-32">
          <h1 className="text-4xl text-center mb-4">Login</h1>
          <form
            className="w-2/4 mx-auto space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="your@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="form-controls my-5">
              {isLoginUserLoading ? <LoadingButton /> : <Button>Login</Button>}

              <div className="text-center py-2 text-gray-500">
                Don't have an account?{" "}
                <Link className="underline text-black" to="/register">
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
