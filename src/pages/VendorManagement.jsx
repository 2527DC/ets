import React, { useState } from "react";
import { Plus } from "lucide-react";
import VendorList from "../components/vendor/VendorList";
import EntityModal from "../components/EntityModal";

const VendorManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreate = () => {
    setModalMode("create");
    setSelectedEntity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (vendor) => {
    setModalMode("edit");
    setSelectedEntity(vendor);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    console.log("Submitting Vendor:", formData);
    // 🔗 API call to create/update vendor here
    setIsModalOpen(false);
    setRefreshTrigger((prev) => prev + 1); // trigger VendorList refresh
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Vendors Management</h1>
            <p className="text-gray-600">Manage all registered vendors</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Vendor
          </button>
        </div>

        {/* Vendor List */}
        <VendorList onEditVendor={handleEdit} refreshTrigger={refreshTrigger} />

        {/* Entity Modal */}
        <EntityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          entityType="vendor"
          entityData={selectedEntity}
          onSubmit={handleSubmit}
          mode={modalMode}
        />
      </div>
    </div>
  );
};

export default VendorManagement;
