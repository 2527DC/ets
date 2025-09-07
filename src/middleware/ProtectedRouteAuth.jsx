import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const ProtectedRouteAuth = ({ type, redirectPath, authRedirectPath }) => {
  const token = Cookies.get("auth_token");
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // 🚨 If no token or not authenticated
  if (!token || !isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // 🚨 If wrong role, only redirect if not already at their dashboard
  if (user?.type !== type) {
    if (user?.type === "COMPANY" && location.pathname !== "/dashboard") {
      return <Navigate to="/dashboard" replace />;
    }
    if (user?.type === "MASTER_ADMIN" && location.pathname !== "/superadmin/dashboard") {
      return <Navigate to="/superadmin/dashboard" replace />;
    }
    if (user?.type === "Vendor" && location.pathname !== "/vendor/dashboard") {
      return <Navigate to="/vendor/dashboard" replace />;
    }
  }

  // 🚨 If correct role & on base path, redirect to dashboard
  if (authRedirectPath && location.pathname === redirectPath) {
    return <Navigate to={authRedirectPath} replace />;
  }

  // ✅ Otherwise allow route
  return <Outlet />;
};

export default ProtectedRouteAuth;
