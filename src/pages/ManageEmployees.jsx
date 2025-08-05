import React, { useState } from 'react';
import EmployeeList from "../components/teams/EmployeeList";
import { useNavigate, useParams } from 'react-router-dom';

const ManageEmployees = () => {


  const [employees] = useState([
    {
      user_id: '1',
      username: 'John Doe',
      employee_code: 'EMP001',
      email: 'john@example.com',
      mobile_number: '1234567890',
      gender: 'Male',
    },
    {
      user_id: '2',
      username: 'Jane Smith',
      employee_code: 'EMP002',
      email: 'jane@example.com',
      mobile_number: '9876543210',
      gender: 'Female',
    },
  ]);

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);


  const navigate = useNavigate();
  const { depId } = useParams(); // Get the teamId from the URL

  const handleCheckboxChange = (id) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((eId) => eId !== id) : [...prev, id]
    );
  };

  const handleRowClick = (employee, e) => {
    alert(`Row clicked: ${employee.username}`);
  };
  // Replace your existing handlers with these
  const handleAddClick = () => {
    navigate(`/department/${depId}/employees/new`);
  };

  const handleView = (employee) => {
    navigate(`/department/${depId}/employees/${employee.user_id}/view`);
  };

  const handleEdit = (employee) => {
    navigate(`/department/${depId}/employees/${employee.user_id}/edit`);
  };

  return (
    <EmployeeList
      employees={employees}
      loading={false}
      error=""
      selectedEmployeeIds={selectedEmployeeIds}
      onAddClick={handleAddClick}
      onCheckboxChange={handleCheckboxChange}
      onRowClick={handleRowClick}
      onView={handleView}
      onEdit={handleEdit}
    />
  );
};

export default ManageEmployees;
