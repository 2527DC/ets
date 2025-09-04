import { Outlet, Link } from "react-router-dom";

export default function SuperAdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">SuperAdmin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/superadmin">Dashboard</Link>
          <Link to="/superadmin/manage-departments">Departments</Link>
          <Link to="/superadmin/manage-drivers">Drivers</Link>
          <Link to="/superadmin/manage-vendors">Vendors</Link>
          <Link to="/superadmin/manage-vehicles">Vehicles</Link>
          <Link to="/superadmin/manage-shifts">Shifts</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
