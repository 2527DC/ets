import { useMemo, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import { logDebug } from "../utils/logger";
import ToolBar from "../ui/ToolBar";
import { Plus } from "lucide-react";
import { set } from "date-fns";

const VendorManagement = () => {

const [vendors, setVendors] = useState([]);
const [loading, setLoading] = useState(false);
const [vendorModel, setVendorModel] = useState(false)


    const headers = useMemo(
        () => [
          { key: "name", label: "Vendor Name" },
          { key: "phone", label: "Phone Number" },
          { key: "email", label: "Email" },
          { key: "address", label: "Address" },
          {
            key: "is_active",
            label: "Status",
            render: (row) => (row.is_active ? "Active" : "Inactive"),
          },
        ],
        []
      );

      const handleToggleStatus = (vendor) => {
        logDebug(`Toggling status for vendor: ${vendor.name}`);
      }   
      
      const onAddClick=() => {
        logDebug("Add Vendor button clicked");
      }
      
    return (
        <div >
          <ToolBar
        onAddClick={() => setVendorModel(true)}
        addButtonLabel="Add Vendor"
        addButtonIcon={<Plus size={16} />}
        className="p-4 bg-white border rounded shadow-sm"
      />
         <DynamicTable
        headers={headers}
        data={vendors}
        renderActions={(row) => (
          <div className="flex gap-2 text-sm">
            <button className="text-blue-600 hover:underline" onClick={() => handleEdit(row)}>
              Edit
            </button>
            <button className="text-red-600 hover:underline" onClick={() => handleDelete(row)}>
              Delete
            </button>
            <button
              className="text-yellow-600 hover:underline"
              onClick={() => handleToggleStatus(row)}
            >
              {row.is_active ? "Deactivate" : "Activate"}
            </button>
          </div>
        )}
      />
        </div>
    );
    }

    export default VendorManagement;