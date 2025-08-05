import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { API_CLIENT } from '../../Api/API_Client';
import { logDebug, logError } from '../../utils/logger';
import { upsertTeam } from '../../redux/features/user/userSlice';

const DepartmentForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      logDebug("Creating team with data:", formData);
      const response = await API_CLIENT.post('/users/create-department', formData);
      
      // Dispatch the action to update Redux store
      dispatch(upsertTeam({
        id: response.data.team.id,
        name: response.data.team.name,
        companyId: response.data.team.companyId,
        description: response.data.team.description,
        employeeIds: [] // Initialize with empty array
      }));

      toast.success('Team created successfully');
      onClose(); // Close the modal
    } catch (error) {
      logError("Error creating team:", error);
      toast.error('Failed to create team' + (error.response?.data?.message || ''));
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default DepartmentForm;
