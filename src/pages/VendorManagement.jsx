import React, { useEffect, useMemo, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import ToolBar from "../components/ui/ToolBar";
import { Edit, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { API_CLIENT } from "../Api/API_Client";
import usePermission from "../hooks/userModulePermission";
import VendorForm from "../components/vendor/VendorForm";

const PermissionDenied = () => (
  <div className="flex flex-col items-center justify-center h-64 text-center">
    <h2 className="text-2xl font-bold text-red-600">Permission Denied</h2>
    <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
  </div>
);

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const { canRead, canWrite, canDelete } = usePermission("manage-vendors");

  const headers = useMemo(
    () => [
      { key: "name", label: "Vendor Name" },
      { key: "phone", label: "Phone Number" },
      { key: "email", label: "Email" },
      { key: "address", label: "Address" },
      {
        key: "isActive",
        label: "Status",
        render: (row) => (
          <span className={`px-2 py-1 rounded text-xs ${row.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {row.isActive ? "Active" : "Inactive"}
          </span>
        ),
      },
    ],
    []
  );

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await API_CLIENT.get("/vendors");
      setVendors(response.data.vendors);
    } catch (err) {
      console.error("Error fetching vendors:", err);
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleSelectItem = (item, isSelected) => {
    setSelectedItems(prev => 
      isSelected 
        ? [...prev, item] 
        : prev.filter(i => i.id !== item.id)
    );
  };

  const openAddModal = () => {
    setSelectedVendor(null);
    setVendorModalOpen(true);
  };

  const openEditModal = (vendor) => {
    setSelectedVendor(vendor);
    setVendorModalOpen(true);
  };

  const closeModal = () => {
    setVendorModalOpen(false);
    setSelectedVendor(null);
  };

  const handleSaveVendor = async (formData) => {
    try {
      if (selectedVendor) {
        await API_CLIENT.put(`/vendors/${selectedVendor.id}`, formData);
        toast.success("Vendor updated successfully");
      } else {
        await API_CLIENT.post("/vendors", formData);
        toast.success("Vendor created successfully");
      }
      fetchVendors();
      closeModal();
    } catch (error) {
      console.error("Error saving vendor:", error);
      toast.error(error.response?.data?.message || "Failed to save vendor");
    }
  };

  const handleDelete = async (vendor) => {
    if (!window.confirm(`Are you sure you want to delete "${vendor.name}"?`)) return;

    try {
      await API_CLIENT.delete(`/vendors/${vendor.id}`);
      toast.success("Vendor deleted successfully");
      fetchVendors();
    } catch (error) {
      console.error("Error deleting vendor:", error);
      toast.error("Failed to delete vendor");
    }
  };

  if (!canRead) return <PermissionDenied />;

  return (
    <div className="p-4">
      <ToolBar
        onAddClick={canWrite ? openAddModal : null}
        addButtonLabel="Add Vendor"
        addButtonIcon={<Plus size={16} />}
        // selectedCount={selectedItems.length}
        // onBulkDelete={canDelete ? () => handleDelete(selectedItems[0]) : null}
        className="mb-4"
      />

      <DynamicTable
        headers={headers}
        data={vendors}
        loading={loading}
        onSelectItem={handleSelectItem}
        selectedItems={selectedItems}
        renderActions={(row) => (
          <div className="flex gap-2">
            {canWrite && (
              <button
                onClick={() => openEditModal(row)}
                className="text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                <Edit size={16} />
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => handleDelete(row)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        )}
      />

      <VendorForm
        isOpen={vendorModalOpen}
        onClose={closeModal}
        onSave={handleSaveVendor}
        initialData={selectedVendor}
      />
    </div>
  );
};

export default VendorManagement;