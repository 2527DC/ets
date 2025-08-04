import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const token = Cookies.get("auth_token");

  console.log("this is the auth token", token);

  // 🛠️ Return the Navigate component when token exists
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
