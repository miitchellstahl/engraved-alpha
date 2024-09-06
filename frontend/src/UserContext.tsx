import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { validateToken } from "./api/MyAuthApi";
import { getMyUser } from "@/api/MyUserApi";
import { User } from "./types";

type Props = {
  children: React.ReactNode;
};

type UserContextType = {
  isLoggedIn: boolean;
  userId: string;
  isValidatingToken: boolean;
  isLoadingUser: boolean;
  user: User | null;
};

const defaultValue: UserContextType = {
  isLoggedIn: false,
  isValidatingToken: true,
  isLoadingUser: true,
  userId: "",
  user: null,
};

export const UserContext = createContext<UserContextType>(defaultValue);

export function UserContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);

  const { isLoading: isValidatingToken, data: tokenData } = useQuery(
    "validateToken",
    validateToken,
    {
      retry: false,
      onSuccess: (data) => {
        setIsLoggedIn(true);
        setUserId(data?.userId || "");
      },
      onError: () => {
        setIsLoggedIn(false);
        setUserId("");
        setUser(null);
      },
    }
  );

  const { isLoading: isLoadingUser, data: userData } = useQuery(
    "getUser",
    getMyUser,
    {
      enabled: isLoggedIn,
      onSuccess: (data) => {
        setUser(data);
      },
    }
  );

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        isValidatingToken,
        isLoadingUser,
        userId,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
