import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from "../components/teams/EmployeeList";
import { useNavigate, useParams } from 'react-router-dom';
import { API_CLIENT } from '../Api/API_Client'; // Assuming you have an API client configured
import { toast } from 'react-toastify';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const navigate = useNavigate();
  const { depId } = useParams();

  // Fetch employees for the department
  useEffect(() => {
    const fetchDepartmentEmployees = async () => {
      try {
        setLoading(true);
        const response = await API_CLIENT.get(`users/department-employees/${depId}`);
        setEmployees(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to load employees. Please try again.');
        toast.error('Failed to load employees');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentEmployees();
  }, [depId]); // Re-fetch when department ID changes

  const handleCheckboxChange = (id) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((eId) => eId !== id) : [...prev, id]
    );
  };

  const handleRowClick = (employee, e) => {
    // Prevent navigation if clicking on a checkbox
    if (e.target.type === 'checkbox') return;
    navigate(`/department/${depId}/employees/${employee.user_id}/view`);
  };

  const handleAddClick = () => {
    navigate(`/department/${depId}/employees/new`);
  };

  const handleView = (employee) => {
    navigate(`/department/${depId}/employees/${employee.id}/view`, {
      state: { employee },
    });
  };

  const handleEdit = (employee) => {
    navigate(`/department/${depId}/employees/${employee.id}/edit`, {
      state: { employee },
    });
  };
  return (
    <EmployeeList
      employees={employees}
      loading={loading}
      error={error}
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