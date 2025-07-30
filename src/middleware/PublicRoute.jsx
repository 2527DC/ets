import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const token = Cookies.get("auth_token");


  console.log(" this is the auth token ", token);
  

  if (token) {
    Navigate("/dashboard");
  }

  return children;
};
