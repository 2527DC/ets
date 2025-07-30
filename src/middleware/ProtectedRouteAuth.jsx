
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRouteAuth = ({ redirectPath = "/" }) => {
  const token = Cookies.get("auth_token");


  console.log(" this is the auth token ", token);
  
  if (!token) return <Navigate to={redirectPath} replace />;

  // Render nested routes if authenticated
  return <Outlet />;
};

export default ProtectedRouteAuth;
