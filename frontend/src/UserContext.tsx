import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { validateToken } from "./api/MyAuthApi";

type Props = {
  children: React.ReactNode;
};

type UserContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  userId: string;
};

const defaultValue: UserContextType = {
  isLoggedIn: false,
  isLoading: true,
  userId: "",
};

export const UserContext = createContext<UserContextType>(defaultValue);

export function UserContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const { isLoading, data } = useQuery("validateToken", validateToken, {
    retry: false,
    onSuccess: () => {
      setIsLoggedIn(true);
      setUserId(data?.userId || "");
    },
    onError: () => {
      setIsLoggedIn(false);
      setUserId("");
    },
  });

  useEffect(() => {
    if (data) {
      setUserId(data.userId);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ isLoggedIn, isLoading, userId }}>
      {children}
    </UserContext.Provider>
  );
}
