import React from 'react';
import { Truck, Users, Phone, Mail, MapPin, Link2, Building2 } from 'lucide-react';

const VendorCard = ({ vendor = {}, companies = [], onEdit }) => {
  // Ensure both are arrays
  const vendorCompanies = Array.isArray(vendor.companies) ? vendor.companies : [];
  const assignedCompanies = Array.isArray(companies)
    ? companies.filter((company) => vendorCompanies.includes(company.id))
    : [];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-[420px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Truck className="w-6 h-6" />
            <h3 className="text-lg font-semibold truncate">{vendor.name || 'N/A'}</h3>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${vendor.isActive ? 'bg-green-800 text-white' : 'bg-red-600 text-white'}`}>
            {vendor.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Vendor Details */}
      <div className="p-4 space-y-3 flex-shrink-0">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span className="truncate">{vendor.email || 'N/A'}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span>{vendor.phone || 'N/A'}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          <span>{vendor.fleetSize ?? 0} vehicles</span>
        </div>

        <div className="flex items-start text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">{vendor.address || 'N/A'}</span>
        </div>
      </div>

      {/* Assigned Companies Section */}
      <div className="pt-3 border-t border-gray-100 flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-2 px-4 flex-shrink-0">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <Link2 className="w-4 h-4 mr-2" />
            Assigned Companies
          </div>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {assignedCompanies.length} companies
          </span>
        </div>

        {assignedCompanies.length === 0 ? (
          <div className="text-center py-4 text-gray-400 text-sm flex-1 flex items-center justify-center">
            <div>
              <Building2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              No companies assigned yet
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 pb-2">
            <div className="space-y-2">
              {assignedCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {company.name}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex-shrink-0 ml-2">
                    Partner
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
        <span className="text-xs text-gray-500 whitespace-nowrap">
          Since: {vendor.onboardedAt ? new Date(vendor.onboardedAt).toLocaleDateString() : 'N/A'}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit?.(vendor)}
            className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            Edit
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            Assign Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
