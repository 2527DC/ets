import React, { useState } from "react";
import RoleToolbar from "../components/RoleManagement/RoleToolbar";
import RoleList from "../components/RoleManagement/RoleList";
import RoleForm from "../components/RoleManagement/RoleForm";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: "1", name: "Administrator", description: "Full system access" },
    { id: "2", name: "Editor", description: "Can edit content" },
    { id: "3", name: "Viewer", description: "Read-only access" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Example modules in the format your RoleForm expects
  const allowedModules = [
    { moduleKey: "role_management", canRead: true, canWrite: true, canDelete: false, isRestricted: true },
    { moduleKey: "scheduling_management", canRead: true, canWrite: true, canDelete: false, isRestricted: false },
    { moduleKey: "driver_management", canRead: true, canWrite: true, canDelete: false, isRestricted: false },
    { moduleKey: "vendor_management", canRead: true, canWrite: true, canDelete: false, isRestricted: false },
    { moduleKey: "routing", canRead: true, canWrite: true, canDelete: false, isRestricted: false },
    { moduleKey: "admin_dashboard", canRead: true, canWrite: true, canDelete: false, isRestricted: false },
    { moduleKey: "tracking", canRead: true, canWrite: true, canDelete: false, isRestricted: false },
    { moduleKey: "department_management", canRead: true, canWrite: true, canDelete: false, isRestricted: false },
  ];

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditRole = (role) => console.log("Edit role", role);
  const handleDeleteRole = (role) => console.log("Delete role", role);
  const handleDuplicateRole = (role) => console.log("Duplicate role", role);

  const handleCreateRole = (newRole) => {
    console.log("Role created", newRole);
    setRoles(prev => [...prev, { id: String(prev.length + 1), ...newRole }]);
  };

  return (
    <div className="p-4">
      <RoleToolbar
        onCreateClick={() => setShowCreateForm(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="mt-4">
        {loading && <p>Loading roles...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <RoleList
            roles={filteredRoles}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
            onDuplicate={handleDuplicateRole}
          />
        )}
      </div>

      {/* RoleForm modal */}
      <RoleForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={handleCreateRole}
        allowedModules={allowedModules} // pass static modules here
        mode="create"
      />
    </div>
  );
};

export default RoleManagement;
