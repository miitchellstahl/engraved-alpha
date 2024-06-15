import { useMutation, useQueryClient } from "react-query";
import { signOut } from "@/api/MyAuthApi";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return <Button onClick={handleClick}>Sign out</Button>;
};

export default SignOutButton;
