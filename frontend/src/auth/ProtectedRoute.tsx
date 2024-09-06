import { UserContext } from "@/UserContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isValidatingToken, isLoggedIn } = useContext(UserContext);

  if (isValidatingToken) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
