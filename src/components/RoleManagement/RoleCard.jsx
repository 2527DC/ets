import React from 'react';
/** @typedef {import('./types').RoleCardProps} RoleCardProps */
import { MoreVertical, Eye, Edit, Trash2, Copy } from 'lucide-react';

/**
 * Renders a simple role card with header, description, and color-coded footer actions.
 * @param {RoleCardProps} props
 * @returns {JSX.Element}
 */
function RoleCard({ role, onEdit, onDelete, onDuplicate }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors bg-white shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{role.name}</h3>
          <p className="text-sm text-gray-500">{role.description || 'Basic access'}</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
        <span className="text-xs text-gray-500">
          Created {role.createdAt || 'N/A'}
        </span>
        <div className="flex items-center space-x-2">
          {/* View Button */}
          <button
            onClick={() => onEdit(role)}
            className="flex items-center justify-center p-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            title="View"
          >
            <Eye className="w-3 h-3" />
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(role)}
            className="flex items-center justify-center p-1 rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors"
            title="Edit"
          >
            <Edit className="w-3 h-3" />
          </button>

          {/* Duplicate Button */}
          <button
            onClick={() => onDuplicate(role)}
            className="flex items-center justify-center p-1 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
            title="Duplicate"
          >
            <Copy className="w-3 h-3" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(role)}
            className="flex items-center justify-center p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleCard;
