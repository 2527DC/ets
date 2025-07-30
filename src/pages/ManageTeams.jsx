import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserX } from 'lucide-react';
// import TeamForm from '../components/TeamForm'; // Keep this if you want to show modal UI
// import Loading from '../components/ui/Loading'; // Optional

const dummyTeams = [
  {
    department_id: 1,
    department_name: 'Engineering',
    description: 'Handles all development',
    employee_count: 12,
  },
  {
    department_id: 2,
    department_name: 'Marketing',
    description: 'Marketing and outreach',
    employee_count: 5,
  },
];

const ManageTeams = () => {
  const navigate = useNavigate();

  const handleEdit = (teamId) => {
    alert(`Edit team ${teamId}`);
  };

  const handleDelete = (teamId) => {
    alert(`Delete team ${teamId}`);
  };

  const handleModalOpen = () => {
    alert('Open create team modal');
  };

  return (
    <div className="p-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleModalOpen}
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
        </div>
      </div>

      {/* Teams Table */}
      <div className="overflow-x-auto bg-white rounded shadow max-h-[500px] overflow-y-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left">Select</th>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Employees</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyTeams.map((team) => (
              <tr key={team.department_id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">
                  <input type="checkbox" disabled />
                </td>
                <td className="px-3 py-2">{team.department_name}</td>
                <td className="px-3 py-2">{team.description || '-'}</td>
                <td className="px-3 py-2">
                  <button
                    className="bg-green-100 text-green-800 px-2 py-0.5 rounded"
                    onClick={() => navigate(`/teams/${team.department_id}/employees`)}
                  >
                    {team.employee_count || 0}
                  </button>
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-3">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEdit(team.department_id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(team.department_id)}
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

      {/* Modal placeholder */}
      {/* <TeamForm isOpen={false} onClose={() => {}} /> */}
    </div>
  );
};

export default ManageTeams;
