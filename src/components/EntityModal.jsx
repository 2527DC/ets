import React, { useState, useEffect } from 'react';
import { X, Building2, Truck, User, Lock, Save, Edit } from 'lucide-react';
import { companyPermissionModules, vendorPermissionModules, getModulesByCategory } from '../staticData/permissionModules';

const EntityModal = ({ 
  isOpen, 
  onClose, 
  entityType, 
  entityData, 
  onSubmit,
  mode = 'create' // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    company: {},
    vendor: {},
    adminUser: {},
    permissions: []
  });
  const [errors, setErrors] = useState({});

  const modules = entityType === 'company' ? companyPermissionModules : vendorPermissionModules;
  const categorizedModules = getModulesByCategory(modules);

  useEffect(() => {
    if (entityData) {
      setFormData(entityData);
    } else {
      setFormData({
        company: {},
        vendor: {},
        adminUser: {},
        permissions: modules.map(module => ({
          moduleKey: module.key,
          canRead: false,
          canWrite: false,
          canDelete: false
        }))
      });
    }
  }, [entityData, entityType]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePermissionChange = (moduleKey, permissionType, value) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.map(perm =>
        perm.moduleKey === moduleKey
          ? { ...perm, [permissionType]: value }
          : perm
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate company/vendor fields
    const entityFields = entityType === 'company' ? 
      ['name', 'email', 'phone', 'address'] : 
      ['name', 'email', 'phone', 'address', 'licenseNumber', 'gstNumber'];
    
    entityFields.forEach(field => {
      if (!formData[entityType][field]) {
        newErrors[`${entityType}.${field}`] = `${field.replace(/_/g, ' ')} is required`;
      }
    });

    // Validate admin user fields
    const adminFields = ['name', 'email', 'password', 'phone'];
    adminFields.forEach(field => {
      if (!formData.adminUser[field]) {
        newErrors[`adminUser.${field}`] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center space-x-3">
            {entityType === 'company' ? (
              <Building2 className="w-6 h-6 text-blue-600" />
            ) : (
              <Truck className="w-6 h-6 text-green-600" />
            )}
            <h2 className="text-xl font-semibold text-gray-800">
              {mode === 'create' ? 'Create' : 'Edit'} {entityType === 'company' ? 'Company' : 'Vendor'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company/Vendor Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h3 className="text-lg font-medium text-gray-800 md:col-span-2 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              {entityType === 'company' ? 'Company' : 'Vendor'} Details
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData[entityType]?.name || ''}
                onChange={(e) => handleInputChange(entityType, 'name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors[`${entityType}.name`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={`Enter ${entityType} name`}
              />
              {errors[`${entityType}.name`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`${entityType}.name`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData[entityType]?.email || ''}
                onChange={(e) => handleInputChange(entityType, 'email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors[`${entityType}.email`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email"
              />
              {errors[`${entityType}.email`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`${entityType}.email`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                value={formData[entityType]?.phone || ''}
                onChange={(e) => handleInputChange(entityType, 'phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors[`${entityType}.phone`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter phone number"
              />
              {errors[`${entityType}.phone`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`${entityType}.phone`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                value={formData[entityType]?.address || ''}
                onChange={(e) => handleInputChange(entityType, 'address', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors[`${entityType}.address`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter address"
              />
              {errors[`${entityType}.address`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`${entityType}.address`]}</p>
              )}
            </div>

            {/* Vendor-specific fields */}
            {entityType === 'vendor' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Number *
                  </label>
                  <input
                    type="text"
                    value={formData.vendor?.licenseNumber || ''}
                    onChange={(e) => handleInputChange('vendor', 'licenseNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['vendor.licenseNumber'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter license number"
                  />
                  {errors['vendor.licenseNumber'] && (
                    <p className="text-red-500 text-sm mt-1">{errors['vendor.licenseNumber']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Number *
                  </label>
                  <input
                    type="text"
                    value={formData.vendor?.gstNumber || ''}
                    onChange={(e) => handleInputChange('vendor', 'gstNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors['vendor.gstNumber'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter GST number"
                  />
                  {errors['vendor.gstNumber'] && (
                    <p className="text-red-500 text-sm mt-1">{errors['vendor.gstNumber']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.vendor?.website || ''}
                    onChange={(e) => handleInputChange('vendor', 'website', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter website URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.vendor?.logo || ''}
                    onChange={(e) => handleInputChange('vendor', 'logo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter logo URL"
                  />
                </div>
              </>
            )}
          </div>

          {/* Admin User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <h3 className="text-lg font-medium text-gray-800 md:col-span-2 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Admin User Details
            </h3>
            
            {['name', 'email', 'phone'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)} *
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  value={formData.adminUser[field] || ''}
                  onChange={(e) => handleInputChange('adminUser', field, e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors[`adminUser.${field}`] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={`Enter admin ${field}`}
                />
                {errors[`adminUser.${field}`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`adminUser.${field}`]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password {mode === 'create' ? '*' : ''}
              </label>
              <input
                type="password"
                value={formData.adminUser?.password || ''}
                onChange={(e) => handleInputChange('adminUser', 'password', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  mode === 'create' && errors['adminUser.password'] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={mode === 'create' ? 'Enter password' : 'Leave blank to keep current'}
              />
              {mode === 'create' && errors['adminUser.password'] && (
                <p className="text-red-500 text-sm mt-1">{errors['adminUser.password']}</p>
              )}
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Permissions
            </h3>
            
            <div className="space-y-6">
              {Object.entries(categorizedModules).map(([category, categoryModules]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryModules.map(module => {
                      const permission = formData.permissions.find(p => p.moduleKey === module.key) || {};
                      return (
                        <div key={module.key} className="bg-gray-50 rounded-lg p-3">
                          <label className="block font-medium text-gray-800 mb-2">
                            {module.name}
                          </label>
                          <div className="space-y-2">
                            {['canRead', 'canWrite', 'canDelete'].map(permType => (
                              <label key={permType} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={permission[permType] || false}
                                  onChange={(e) => handlePermissionChange(module.key, permType, e.target.checked)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  {permType.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              {mode === 'create' ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create {entityType === 'company' ? 'Company' : 'Vendor'}
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Update {entityType === 'company' ? 'Company' : 'Vendor'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntityModal;