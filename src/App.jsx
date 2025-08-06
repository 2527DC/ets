import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_CLIENT } from "./Api/API_Client";
import { logDebug } from "./utils/logger";
import { Login } from "./pages/Login";
import { PublicRoute } from "./middleware/PublicRoute";
import Layout from "./components/layout/layout";
import EmployeeForm from "./components/teams/EmployeeForm";
import ProtectedRouteAuth from "./middleware/ProtectedRouteAuth";
import ManageDepartment from "./pages/ManageDepartment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ManageEmployees from "./pages/ManageEmployees";
import VendorManagement from "./pages/VendorManagement";
import VehicleManagement from "./pages/VehicleManagement";
import ShiftManagement from "./pages/ShiftManagement";
import NoInternetModal from "./components/modal/NoInternetModal";

function App() {
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);
  const [isServerDown, setIsServerDown] = useState(false);
  const [initialLoadFailed, setInitialLoadFailed] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Set up Axios response interceptor
  useEffect(() => {
    const interceptor = API_CLIENT.interceptors.response.use(
      response => response,
      error => {
        if (
          error.message === "Network Error" ||
          error.code === "ERR_NETWORK" ||
          error.response?.status === 500
        ) {
          setIsServerDown(true);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      API_CLIENT.interceptors.response.eject(interceptor);
    };
  }, []);

  const fetchUserPermissions = async () => {
    try {
      logDebug("Fetching user permissions from API...");
      const response = await API_CLIENT.get("/role-permissions/permissions");
      const data = response.data;
      sessionStorage.setItem("userPermissions", JSON.stringify(data));
      setIsServerDown(false); // Reset server down status if successful
    } catch (error) {
      console.error("Permission fetch error:", error);
      if (
        error.message === "Network Error" ||
        error.code === "ERR_NETWORK" ||
        error.response?.status === 500
      ) {
        setIsServerDown(true);
        setInitialLoadFailed(true);
      }
    } finally {
      setPermissionsLoaded(true);
    }
  };

  useEffect(() => {
    const userPermissions = sessionStorage.getItem("userPermissions");
    if (!userPermissions) {
      fetchUserPermissions();
    } else {
      setPermissionsLoaded(true);
    }
  }, []);

  const handleRetry = async () => {
    setIsServerDown(false);
    setInitialLoadFailed(false);
    window.location.reload();
    
  
    try {
      await fetchUserPermissions();
    } catch (error) {
      setIsServerDown(true);
    }
  };

  // Show connection error if either internet is down or server is down
  const showConnectionError = !isOnline || isServerDown;

  if (initialLoadFailed) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <NoInternetModal 
          onRetry={handleRetry} 
          showCloseButton={false}
          message={!isOnline 
            ? "No internet connection. Please check your network." 
            : "Unable to connect to the server. Please try again."}
        />
      </div>
    );
  }

  if (!permissionsLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading permissions...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      {showConnectionError && (
        <NoInternetModal 
          onRetry={handleRetry}
          message={!isOnline 
            ? "You're offline. Please check your internet connection." 
            : "Connection to server lost. Trying to reconnect..."}
        />
      )}

      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

        <Route element={<ProtectedRouteAuth />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<h1>This is the dashboard</h1>} />
            <Route path="/manage-team" element={<ManageDepartment />} />
            <Route path="/shift-categories" element={<ManageDepartment />} />
            <Route path="/role-management" element={<h1>This is the role Management View</h1>} />
            <Route path="/manage-company" element={<ManageDepartment />} />
            <Route path="/manage-shift" element={<ShiftManagement />} />
            <Route path="/manage-vendors" element={<VendorManagement />} />
            <Route path="/manage-vehicles" element={<VehicleManagement />} />
            <Route path="/employee/create-employee" element={<EmployeeForm />} />
            <Route path="/department/:depId/employees" element={<ManageEmployees />} />
            <Route path="/department/:depId/employees/:employeeId/edit" element={<EmployeeForm mode="edit" />} />
            <Route path="/department/:depId/employees/:employeeId/view" element={<EmployeeForm mode="view" />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const NotFound = () => (
  <div className="flex justify-center items-center h-screen">
    <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
  </div>
);