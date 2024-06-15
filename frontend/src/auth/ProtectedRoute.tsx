import { UserContext } from "@/UserContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoading, isLoggedIn } = useContext(UserContext);

  if (isLoading) {
    return null;
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/createaccount" replace />;
};

export default ProtectedRoute;
