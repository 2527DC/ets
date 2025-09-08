import React, { useState } from 'react';
import { Search, Filter, Plus, Truck } from 'lucide-react';
import VendorCard from './VendorCard';

// Static data
const vendorsData = [
  {
    id: 101,
    name: 'City Truckers',
    email: 'dispatch@citytruckers.com',
    phone: '+1 (555) 111-2222',
    address: '100 Truckers Lane, Dallas, TX 75201',
    fleetSize: 45,
    status: 'Active',
    joinedDate: 'Dec 1, 2023',
    companies: [1, 2]
  },
  {
    id: 102,
    name: 'Regional Haulers',
    email: 'contact@regionalhaulers.com',
    phone: '+1 (555) 333-4444',
    address: '200 Haulers Road, Denver, CO 80201',
    fleetSize: 28,
    status: 'Active',
    joinedDate: 'Jan 10, 2024',
    companies: [1,2,3,4]
  },
  {
    id: 103,
    name: 'Express Movers',
    email: 'info@expressmovers.com',
    phone: '+1 (555) 555-6666',
    address: '300 Express Way, Phoenix, AZ 85001',
    fleetSize: 35,
    status: 'Active',
    joinedDate: 'Feb 15, 2024',
    companies: [3]
  },
  {
    id: 104,
    name: 'Heavy Load Specialists',
    email: 'heavy@specialists.com',
    phone: '+1 (555) 777-8888',
    address: '400 Heavy Lane, Seattle, WA 98101',
    fleetSize: 12,
    status: 'Active',
    joinedDate: 'Mar 20, 2024',
    companies: []
  }
];

const companiesData = [
  { id: 1, name: 'ABC Logistics', status: 'Active' },
  { id: 2, name: 'XYZ Transport Solutions', status: 'Active' },
  { id: 3, name: 'Global Shipping Co.', status: 'Active' },
  { id: 4, name: 'Fast Delivery Inc.', status: 'Pending' }
];

const VendorList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVendors = vendorsData.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{vendorsData.length}</div>
          <div className="text-sm text-gray-600">Total Vendors</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {vendorsData.filter(v => v.status === 'Active').length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {vendorsData.filter(v => v.status === 'Pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-red-600">
            {vendorsData.filter(v => v.status === 'Suspended').length}
          </div>
          <div className="text-sm text-gray-600">Suspended</div>
        </div>
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600">No vendors found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              companies={companiesData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorList;