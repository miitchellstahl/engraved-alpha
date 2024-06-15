import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { validateToken } from "./api/MyAuthApi";

type Props = {
  children: React.ReactNode;
};

type UserContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
};

const defaultValue: UserContextType = {
  isLoggedIn: false,
  isLoading: true,
};

export const UserContext = createContext<UserContextType>(defaultValue);

export function UserContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoading } = useQuery("validateToken", validateToken, {
    retry: false,
    onSuccess: () => {
      setIsLoggedIn(true);
    },
    onError: () => {
      setIsLoggedIn(false);
    },
  });

  return (
    <UserContext.Provider value={{ isLoggedIn, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
