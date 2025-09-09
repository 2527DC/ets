import React, { useState, useEffect, useMemo } from 'react';
// import EmployeeList from "";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { API_CLIENT } from '../Api/API_Client';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import SearchInput from '../components/ui/SearchInput';
import { logDebug } from '../utils/logger';
import ToolBar from '../components/ui/ToolBar';
import { setDepartmentEmployees, updateEmployeeStatus } from '../redux/features/user/userSlice';
import EmployeeList from '../components/departments/EmployeeList';
import endpoint from '../Api/Endpoints';

const ManageEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { depId } = useParams();
  const dispatch = useDispatch();

  const isActive = searchParams.get("active");

  const allEmployees = useSelector((state) => {
    const ids = state.user.departmentEmployees[depId] || [];
    return ids.map((id) => state.user.employees.byId[id]);
  });
  useEffect(() => {
    fetchEmployeesByDepartment();
  }, [depId]);

  const fetchEmployeesByDepartment = async () => {
    if (allEmployees && allEmployees.length > 0) {
      console.log(`Employees for ${depId} already fetched, skipping API call`);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await API_CLIENT.get(`${endpoint.getEmployesByDepartment}/${depId}?isActive=${isActive}`);
      const { employees, departmentId } = response.data;
      logDebug("Fetched employees:", employees ,departmentId);

      dispatch(setDepartmentEmployees({ departmentId, employees }));
      toast.success('Employees loaded successfully');
    } catch (err) {
      logDebug("Error fetching employees by department", err);
      setError(err.response?.data?.detail || 'Something went wrong');
      toast.error(err.response?.data?.detail || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((eId) => eId !== id) : [...prev, id]
    );
  };

  const handleRowClick = (employee, e) => {
    if (e.target.type === 'checkbox') return;
    navigate(`/employees/${employee.employee_code}/view`);
  };

  const handleAddClick = () => {
    navigate(`/employee/create-employee`);
  };

  const handleView = (employee) => {
    navigate(`/department/${employee.departmentId}/employees/${employee.employee_code}/view`, {
      state: { employee, fromChild: true },
    });
  };
// :depId/employees/:userId/view
  const handleEdit = (employee) => {
    navigate(`/department/${employee.departmentId}/employees/${employee.employee_code}/edit`, {
      state: { employee },
    });
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  // Filter employees based on search query
  const filteredEmployees = useMemo(() => {
    if (!allEmployees || allEmployees.length === 0) return [];

    let result = allEmployees;

    // Apply search filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(employee => {
        const nameMatch = employee.name?.toLowerCase().includes(query);
        const mobileMatch = employee.phone?.toString().includes(query);
        const emailMatch = employee.email?.toLowerCase().includes(query);
        const codeMatch = employee.userId?.toLowerCase().includes(query);
        
        return nameMatch || mobileMatch || emailMatch || codeMatch;
      });
    }

    return result;
  }, [allEmployees, searchTerm]);

// In your parent component


const handleStatusChange = async (employeeId, newIsActive) => {
  try {
    // API call here (commented out for now)
    await API_CLIENT.patch(`api/users/status-update/${employeeId}`, null, { params: { isActive: newIsActive } });

    // Update Redux state
    dispatch(updateEmployeeStatus({ employeeId, isActive: newIsActive }));

    // Success toast
    toast.success(`Employee ${newIsActive ? "activated" : "deactivated"} successfully`);
  } catch (error) {
    console.error("Failed to update status:", error);
    toast.error("Failed to update status");
    throw error;
  }
};


  return (
    <div>
      <ToolBar
      title={`Employees in Department ${depId}`}
        onAddClick={handleAddClick}
        addButtonLabel="Add employee"
        addButtonIcon={<Plus size={16} />}
        className="p-4 bg-white border rounded shadow-sm"
        searchBar={
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <SearchInput
              placeholder="Search by name, mobile, email, or code..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-grow"
            />
          </div>
        }
      />
      
      <EmployeeList
      onStatusChange={handleStatusChange}
        employees={filteredEmployees}
        loading={loading}
        error={error}
        selectedEmployeeIds={selectedEmployeeIds}
        onCheckboxChange={handleCheckboxChange}
        onRowClick={handleRowClick}
        onView={handleView}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ManageEmployees;