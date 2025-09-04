import React from "react";
import { 
  Menu, 
  Bell, 
  Search, 
  User, 
  ChevronDown,
  Truck,
  Users,
  MapPin,
  DollarSign 
} from "lucide-react";

// Static vendor data
const vendorHeaderData = {
  userName: "John Smith",
  userRole: "Vendor Admin",
  notifications: 5,
  todayStats: {
    activeTrips: 8,
    availableDrivers: 12,
    totalRevenue: 2450,
    completedTrips: 15
  }
};

const VendorHeader = ({ toggleSidebar, title }) => {
  const handleNotificationClick = () => {
    alert("Notifications clicked! You have 5 new notifications.");
  };

  const handleProfileClick = () => {
    alert("Profile clicked!");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}`);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left Section - Menu & Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <span className="text-sm text-gray-500">Vendor Portal</span>
          </div>
        </div>

        {/* Center Section - Quick Stats (Hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-blue-600" />
            <div className="text-center">
              <div className="font-semibold text-gray-900">{vendorHeaderData.todayStats.activeTrips}</div>
              <div className="text-xs text-gray-500">Active Trips</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-green-600" />
            <div className="text-center">
              <div className="font-semibold text-gray-900">{vendorHeaderData.todayStats.availableDrivers}</div>
              <div className="text-xs text-gray-500">Available Drivers</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Truck className="w-4 h-4 text-purple-600" />
            <div className="text-center">
              <div className="font-semibold text-gray-900">{vendorHeaderData.todayStats.completedTrips}</div>
              <div className="text-xs text-gray-500">Completed Today</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign className="w-4 h-4 text-yellow-600" />
            <div className="text-center">
              <div className="font-semibold text-gray-900">${vendorHeaderData.todayStats.totalRevenue}</div>
              <div className="text-xs text-gray-500">Today's Revenue</div>
            </div>
          </div>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm w-64"
              />
            </div>
          </form>

          {/* Notifications */}
          <button
            onClick={handleNotificationClick}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {vendorHeaderData.notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {vendorHeaderData.notifications}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-gray-900">{vendorHeaderData.userName}</div>
                <div className="text-xs text-gray-500">{vendorHeaderData.userRole}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Quick Stats Bar */}
      <div className="md:hidden bg-gray-50 px-4 py-2 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-blue-600" />
            <span className="font-semibold">{vendorHeaderData.todayStats.activeTrips}</span>
            <span className="text-gray-500">Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 text-green-600" />
            <span className="font-semibold">{vendorHeaderData.todayStats.availableDrivers}</span>
            <span className="text-gray-500">Drivers</span>
          </div>
          <div className="flex items-center space-x-1">
            <Truck className="w-3 h-3 text-purple-600" />
            <span className="font-semibold">{vendorHeaderData.todayStats.completedTrips}</span>
            <span className="text-gray-500">Done</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3 text-yellow-600" />
            <span className="font-semibold">${vendorHeaderData.todayStats.totalRevenue}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;