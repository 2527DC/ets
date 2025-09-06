import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRouteAuth = ({ redirectPath , authRedirectPath  }) => {
  const token = Cookies.get("auth_token");
  const location = useLocation();

  // If no token -> redirect to login
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated & authRedirectPath is provided -> redirect there
  if (authRedirectPath && location.pathname === redirectPath) {
    return <Navigate to={authRedirectPath} replace />;
  }

  // Otherwise render nested routes
  return <Outlet />;
};

export default ProtectedRouteAuth;
