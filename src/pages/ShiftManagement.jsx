import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import ToolBar from "../ui/ToolBar";
import SearchInput from "../ui/SearchInput";
import DynamicTable from "../components/DynamicTable";

const ShiftManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const onAddClick = () => {
    console.log("Add Shift button clicked");
    // Add shift logic
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Call search API or filter logic here
  };

  const headers = useMemo(
    () => [
      { key: "name", label: "Vendor Name" },
      { key: "phone", label: "Phone Number" },
      { key: "email", label: "Email" },
      { key: "address", label: "Address" },
     
    ],
    []
  );


  return (
    <div>
      <ToolBar
        onAddClick={onAddClick}
        addButtonLabel="New Shift"
        addButtonIcon={<Plus />}
        leftContent={
          <SearchInput
            placeholder="Search by shift name..."
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
          />
        }
        className="p-4 bg-white border rounded shadow-sm"
      />


      <DynamicTable
      headers={headers} />

    </div>
  );
};

export default ShiftManagement;
