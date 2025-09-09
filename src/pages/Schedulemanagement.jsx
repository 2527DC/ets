import { useState } from "react";
import ShiftManagement from "../components/Schedulemanagement/ShiftManagement";
import ShiftCategoryManagement from "../components/Schedulemanagement/ShiftCategoryManagement";

const Schedulemanagement =()=>{
  const [activeTab, setActiveTab] = useState("shift"); // default tab

    return(
        <div>
      {/* Top Navigation */}
      <div className="flex  border-b p-1">
        <button
          className={`px-4 py-2 ${activeTab === "shift" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => setActiveTab("shift")}
        >
          ShiftManagement
         
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "shiftCategory" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => setActiveTab("shiftCategory")}
        >
         ShiftCategoryManagement
        </button>
      </div>

      {/* Conditional Component Rendering */}
      <div className="p-1">
        {activeTab === "shift" && <ShiftManagement />}
        {activeTab === "shiftCategory" && <ShiftCategoryManagement />}

      </div>
    </div>
    )
}

export default Schedulemanagement