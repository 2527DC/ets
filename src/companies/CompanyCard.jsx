import React from 'react';
import { Building2, Users, Phone, Mail, MapPin, Link2, Truck } from 'lucide-react';

const CompanyCard = ({ company, vendors }) => {
  const assignedVendors = vendors.filter(vendor => 
    company.vendors.includes(vendor.id)
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-[420px]"> {/* Fixed height */}
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6" />
            <h3 className="text-lg font-semibold truncate">{company.name}</h3>
          </div>
          <span className="px-2 py-1 bg-blue-800 text-xs rounded-full">
            {company.status || 'Active'}
          </span>
        </div>
      </div>

      {/* Company Details */}
      <div className="p-4 space-y-3 flex-shrink-0">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span className="truncate">{company.email}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span>{company.phone}</span>
        </div>
        
        <div className="flex items-start text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">{company.address}</span>
        </div>
      </div>

      {/* Assigned Vendors Section - Scrollable */}
      <div className="pt-3 border-t border-gray-100 flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-2 px-4 flex-shrink-0">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <Link2 className="w-4 h-4 mr-2" />
            Assigned Vendors
          </div>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {assignedVendors.length} vendors
          </span>
        </div>

        {assignedVendors.length === 0 ? (
          <div className="text-center py-4 text-gray-400 text-sm flex-1 flex items-center justify-center">
            <div>
              <Truck className="w-8 h-8 mx-auto mb-2 opacity-50" />
              No vendors assigned yet
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4 pb-2">
            <div className="space-y-2">
              {assignedVendors.map(vendor => (
                <div 
                  key={vendor.id} 
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {vendor.name}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex-shrink-0 ml-2">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions - Fixed at bottom */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center flex-shrink-0">
        <span className="text-xs text-gray-500 whitespace-nowrap">
          Created: {company.createdDate}
        </span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            Edit
          </button>
          <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
            Assign Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;