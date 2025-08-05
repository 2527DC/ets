import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserX } from 'lucide-react';
import Modal from '../components/modal/Modal';
import DepartmentForm from '../components/teams/DepartmentForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTeams } from '../redux/features/user/userSelectors';
import { API_CLIENT } from '../Api/API_Client';
import { setTeams, upsertTeam, removeTeam } from '../redux/features/user/userSlice';

const ManageDepartment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teams = useSelector(selectAllTeams);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  // Fetch teams on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await API_CLIENT.get('/users/company-departments');
        dispatch(setTeams(response.data));
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    if (!teams || teams.length === 0) {
      fetchTeams();
    }
  }, [dispatch, teams]);

  // Handle team selection
  const handleSelectTeam = (teamId, isSelected) => {
    setSelectedTeams(prev => 
      isSelected 
        ? [...prev, teamId] 
        : prev.filter(id => id !== teamId)
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTeams(teams.map(team => team.department_id));
    } else {
      setSelectedTeams([]);
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setIsOpen(true);
  };

  const handleDelete = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await API_CLIENT.delete(`/users/departments/${teamId}`);
        dispatch(removeTeam({ teamId }));
        setSelectedTeams(selectedTeams.filter(id => id !== teamId));
      } catch (error) {
        console.error('Error deleting team:', error);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedTeams.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedTeams.length} selected teams?`)) {
      try {
        await Promise.all(
          selectedTeams.map(teamId => 
            API_CLIENT.delete(`/users/departments/${teamId}`)
          )
        );
        dispatch(setTeams(
          teams.filter(team => !selectedTeams.includes(team.department_id))
        ));
        setSelectedTeams([]);
      } catch (error) {
        console.error('Error deleting teams:', error);
      }
    }
  };

  const handleFormSuccess = (teamData) => {
    if (editingTeam) {
      // Update existing team
      dispatch(upsertTeam({
        ...teamData,
        department_id: editingTeam.department_id,
        employeeIds: editingTeam.employeeIds || []
      }));
    } else {
      // Add new team
      dispatch(upsertTeam({
        ...teamData,
        employeeIds: []
      }));
    }
    setEditingTeam(null);
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => {
              setEditingTeam(null);
              setIsOpen(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm"
          >
            <UserX size={16} /> Create Department
          </button>
 
          <button
            onClick={() => navigate('/employee/create-employee')}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm"
          >
            <UserX size={16} /> Create Employee
          </button>
          {selectedTeams.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm"
            >
              Delete Selected ({selectedTeams.length})
            </button>
          )}
        </div>
      </div>

      {/* Teams Table */}
      <div className="overflow-x-auto bg-white rounded shadow max-h-[500px] overflow-y-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left">
                <input 
                  type="checkbox" 
                  checked={selectedTeams.length === teams.length && teams.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Employees</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">
                  <input 
                    type="checkbox" 
                    checked={selectedTeams.includes(team.id)}
                    onChange={(e) => handleSelectTeam(team.id, e.target.checked)}
                  />
                </td>
                <td className="px-3 py-2">{team.name}</td>
                <td className="px-3 py-2">{team.description || '-'}</td>
                <td className="px-3 py-2">
                  <button
                    className="bg-green-100 text-green-800 px-2 py-0.5 rounded"
                    onClick={() => navigate(`/department/${team.id}/employees`)}
                  >
                    {team.employee_count || 0}
                  </button>
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-3">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEdit(team)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(team.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={() => {
          setIsOpen(false);
          setEditingTeam(null);
        }} 
        title={editingTeam ? 'Edit Team' : 'Create Team'} 
        size="md"
      >
        <DepartmentForm 
          onClose={() => {
            setIsOpen(false);
            setEditingTeam(null);
          }} 
          onSuccess={handleFormSuccess}
          initialData={editingTeam}
        />
      </Modal>
    </div>
  );
};

export default ManageDepartment;