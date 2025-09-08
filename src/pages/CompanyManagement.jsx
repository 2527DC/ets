import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import EntityModal from '../components/EntityModal';
import CompanyList from '../companies/CompanyList';

const CompanyManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedEntity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (company) => {
    setModalMode('edit');
    setSelectedEntity(company);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    console.log('Submitting:', formData);
    // API call to create/update company/vendor
    setIsModalOpen(false);
    // Trigger refresh of the company list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Companies Management</h1>
            <p className="text-gray-600">Manage all registered transportation companies</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </button>
        </div>

        {/* Company List */}
        <CompanyList 
          onEditCompany={handleEdit}
          refreshTrigger={refreshTrigger}
        />

        {/* Entity Modal */}
        <EntityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          entityType="company"
          entityData={selectedEntity}
          onSubmit={handleSubmit}
          mode={modalMode}
        />
      </div>
    </div>
  );
};

export default CompanyManagement;