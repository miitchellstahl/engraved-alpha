import { User } from "@/types";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type RegisterUserForm = {
  name: string;
  email: string;
  password: string;
};
type LoginUserForm = {
  email: string;
  password: string;
};

export const useCreateMyUser = () => {
  const createMyUserRequest = async (registerUserForm: RegisterUserForm) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUserForm),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(createMyUserRequest);

  if (isSuccess) {
    toast.success("Registration successful");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { createUser, isLoading, isError, isSuccess };
};

export const useLoginMyUser = () => {
  const createMyLoginRequest = async (loginUser: LoginUserForm) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    });

    if (!response.ok) {
      throw new Error("Failed to login user");
    }

    return response.json();
  };

  const mutation = useMutation(createMyLoginRequest, {
    onSuccess: () => {
      toast.success("Logged in");
    },
    onError: (error: any) => {
      toast.error(error.toString());
    },
  });

  return mutation;
};

export const getMyUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user");
  }

  return response.json();
};

export const updateMyUser = async (
  restaurantFormData: FormData
): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/api/my/user`, {
    method: "PUT",
    credentials: "include",
    body: restaurantFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};
