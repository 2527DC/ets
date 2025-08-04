import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_CLIENT } from "./Api/API_Client";
import { logDebug } from "./utils/logger";
import { Login } from "./pages/Login";
import { PublicRoute } from "./middleware/PublicRoute";
import Layout from "./components/layout/layout";
import ManageTeams from "./pages/ManageTeams";
import EmployeeForm from "./components/teams/EmployeeForm";
import ProtectedRouteAuth from "./middleware/ProtectedRouteAuth";

function App() {
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  const fetchUserPermissions = async () => {
    try {
      logDebug("Fetching user permissions from API...");
      const response = await API_CLIENT.get("/role-permissions/permissions");
      const data = response.data;
      sessionStorage.setItem("userPermissions", JSON.stringify(data.allowedModules));
    } catch (error) {
      console.error("Permission fetch error:", error);
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

  if (!permissionsLoaded) {
    // Optional loading spinner or just null
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading permissions...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        
        <Route element={<ProtectedRouteAuth />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<h1>This is the dashboard</h1>} />
            <Route path="/manage-team" element={<ManageTeams />} />
            <Route path="/shift-categories" element={<ManageTeams />} />
            <Route path="/role-management" element={<ManageTeams />} />
            <Route path="/manage-company" element={<ManageTeams />} />
            <Route path="/manage-shift" element={<ManageTeams />} />
            <Route path="/employee/create-employee" element={<EmployeeForm />} />
            <Route path="/employee/:employeeId/edit" element={<EmployeeForm mode="edit" />} />
            <Route path="/employee/:employeeId/view" element={<EmployeeForm mode="view" />} />
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
