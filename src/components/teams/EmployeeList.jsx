import React from 'react';
import { Eye, Pencil, Plus } from 'lucide-react';
import ToolBar from '../../ui/ToolBar';

const EmployeeList = ({
  employees = [],
  loading = false,
  error = '',
  selectedEmployeeIds = [],
  onAddClick,
  onCheckboxChange,
  onRowClick,
  onEdit,
  onView
}) => {
  return (
    <div className="space-y-4">
      <ToolBar
        onAddClick={onAddClick}
        addButtonLabel="Add employee"
        addButtonIcon={<Plus size={16} />}
        className="p-4 bg-white border rounded shadow-sm"
      />
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-medium">
            <tr>
              <th className="p-4">
                <input type="checkbox" disabled className="w-4 h-4" />
              </th>
              <th className="p-4">Name</th>
              <th className="p-4">Employee Code</th>
              <th className="p-4">Email</th>
              <th className="p-4">Mobile Number</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  Loading employees...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-red-500">
                  Failed to load employees: {error}
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee.user_id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={(e) => {
                    if (onRowClick) onRowClick(employee, e);
                  }}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedEmployeeIds.includes(employee.user_id)}
                      onChange={() => onCheckboxChange?.(employee.user_id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="p-4">{employee.username}</td>
                  <td className="p-4">{employee.employee_code}</td>
                  <td className="p-4">{employee.email}</td>
                  <td className="p-4">{employee.mobile_number}</td>
                  <td className="p-4">{employee.gender}</td>
                  <td className="p-4 flex space-x-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => onView?.(employee, e)}
                      className="text-blue-500 hover:text-blue-700"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => onEdit?.(employee, e)}
                      className="text-green-500 hover:text-green-700"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
