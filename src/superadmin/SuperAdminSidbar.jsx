import React, { useState, useEffect } from "react";
import { 
  LogOut, 
  ChevronDown, 
  Pin, 
  PinOff,
  LayoutDashboard,
  Building2,
  Truck,
  Users,
  UserPlus,
  Plus,
  Edit,
  Eye,
  Settings,
  BarChart3,
  Monitor,
  DollarSign,
  HeadphonesIcon,
  Shield,
  FileText,
  Activity,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Receipt,
  MessageSquare,
  Search,
  Lock,
  Crown,
  Globe,
  Zap,
  Database,
  Link2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Static super admin data
const superAdminData = {
  platformName: "TransportHub Platform",
  adminName: "System Administrator",
  email: "admin@transporthub.com",
  totalCompanies: 156,
  totalVendors: 284,
  totalUsers: 12847,
  monthlyRevenue: 185000,
  systemStatus: "All Systems Operational"
};

// Comprehensive super admin menu items
const superAdminMenuItems = [
  {
    name: "Dashboard",
    path: "/superadmin/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Company Management",
    icon: Building2,
    subItems: [
      {
        name: "All Companies",
        path: "/superadmin/companies",
        icon: Building2
      },
      {
        name: "Add Company",
        path: "/superadmin/companies/add",
        icon: Plus
      },
      {
        name: "Company Analytics",
        path: "/superadmin/companies/analytics",
        icon: BarChart3
      }
    ]
  },
  {
    name: "Vendor Management",
    icon: Truck,
    subItems: [
      {
        name: "All Vendors",
        path: "/superadmin/vendors",
        icon: Truck
      },
      {
        name: "Add Vendor",
        path: "/superadmin/vendors/add",
        icon: Plus
      },
      {
        name: "Vendor Analytics",
        path: "/superadmin/vendors/analytics",
        icon: BarChart3
      }
    ]
  },
  {
    name: "Partnerships",
    icon: Link2,
    subItems: [
      {
        name: "Company-Vendor Links",
        path: "/superadmin/partnerships",
        icon: Link2
      },
      {
        name: "Create Partnership",
        path: "/superadmin/partnerships/create",
        icon: Plus
      },
      {
        name: "Partnership Analytics",
        path: "/superadmin/partnerships/analytics",
        icon: BarChart3
      }
    ]
  },
  {
    name: "Admin Management",
    icon: Crown,
    subItems: [
      {
        name: "All Admins",
        path: "/superadmin/admins",
        icon: Users
      },
      {
        name: "Add Admin",
        path: "/superadmin/admins/add",
        icon: UserPlus
      },
      {
        name: "Admin Roles",
        path: "/superadmin/admins/roles",
        icon: Shield
      }
    ]
  },
  {
    name: "User Management",
    icon: Users,
    subItems: [
      {
        name: "All Users",
        path: "/superadmin/users",
        icon: Users
      },
      {
        name: "Company Users",
        path: "/superadmin/users/companies",
        icon: Building2
      },
      {
        name: "Vendor Users",
        path: "/superadmin/users/vendors",
        icon: Truck
      }
    ]
  },
  {
    name: "Platform Management",
    icon: Globe,
    subItems: [
      {
        name: "Module Management",
        path: "/superadmin/platform/modules",
        icon: Database
      },
      {
        name: "Permission Management",
        path: "/superadmin/platform/permissions",
        icon: Lock
      },
      {
        name: "Platform Settings",
        path: "/superadmin/platform/settings",
        icon: Settings
      }
    ]
  },
  {
    name: "System Monitoring",
    icon: Monitor,
    subItems: [
      {
        name: "Performance Metrics",
        path: "/superadmin/monitoring/performance",
        icon: Activity
      },
      {
        name: "System Logs",
        path: "/superadmin/monitoring/logs",
        icon: FileText
      },
      {
        name: "System Alerts",
        path: "/superadmin/monitoring/alerts",
        icon: AlertTriangle
      }
    ]
  },
  {
    name: "Platform Analytics",
    icon: BarChart3,
    subItems: [
      {
        name: "Revenue Analytics",
        path: "/superadmin/analytics/revenue",
        icon: DollarSign
      },
      {
        name: "Usage Analytics",
        path: "/superadmin/analytics/usage",
        icon: TrendingUp
      },
      {
        name: "Growth Analytics",
        path: "/superadmin/analytics/growth",
        icon: Zap
      }
    ]
  },
  {
    name: "Billing Management",
    icon: CreditCard,
    subItems: [
      {
        name: "Subscriptions",
        path: "/superadmin/billing/subscriptions",
        icon: CreditCard
      },
      {
        name: "Invoices",
        path: "/superadmin/billing/invoices",
        icon: Receipt
      },
      {
        name: "Payment Analytics",
        path: "/superadmin/billing/analytics",
        icon: DollarSign
      }
    ]
  },
  {
    name: "Support Management",
    icon: HeadphonesIcon,
    subItems: [
      {
        name: "Support Tickets",
        path: "/superadmin/support/tickets",
        icon: HeadphonesIcon
      },
      {
        name: "Live Chat",
        path: "/superadmin/support/chat",
        icon: MessageSquare
      },
      {
        name: "Knowledge Base",
        path: "/superadmin/support/kb",
        icon: FileText
      }
    ]
  },
  {
    name: "Compliance & Audit",
    icon: Shield,
    subItems: [
      {
        name: "Audit Logs",
        path: "/superadmin/compliance/audit",
        icon: FileText
      },
      {
        name: "Security Settings",
        path: "/superadmin/compliance/security",
        icon: Lock
      },
      {
        name: "Compliance Reports",
        path: "/superadmin/compliance/reports",
        icon: BarChart3
      }
    ]
  },
  {
    name: "Reports Center",
    icon: FileText,
    subItems: [
      {
        name: "Company Reports",
        path: "/superadmin/reports/companies",
        icon: Building2
      },
      {
        name: "Vendor Reports",
        path: "/superadmin/reports/vendors",
        icon: Truck
      },
      {
        name: "System Reports",
        path: "/superadmin/reports/system",
        icon: Monitor
      }
    ]
  },
  {
    name: "Super Admin Settings",
    path: "/superadmin/settings",
    icon: Settings
  }
];

const SuperAdminSidebar = ({ isOpen, setIsOpen, isPinned, setIsPinned }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsPinned(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsPinned]);

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleMouseEnter = () => {
    if (!isMobile && !isPinned) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !isPinned) {
      setIsOpen(false);
      setOpenDropdown({});
    }
  };

  const togglePin = () => {
    if (!isMobile) {
      setIsPinned(!isPinned);
      setIsOpen(!isPinned);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout from Super Admin?")) {
      alert("Logging out from Super Admin...");
      window.location.href = '/superadmin/login';
    }
  };

  const sidebarWidth = isOpen ? "w-72" : "w-20";
  const sidebarClass = `h-screen ${sidebarWidth} bg-slate-900 text-white flex flex-col fixed left-0 transition-all duration-300 ease-in-out z-50 border-r border-slate-700`;

  return (
    <aside
      className={`${sidebarClass} ${
        isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {isOpen && (
          <>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-white flex items-center">
                <Crown className="w-5 h-5 text-yellow-400 mr-2" />
                {superAdminData.platformName}
              </h2>
              <span className="text-xs text-slate-300">Super Admin Portal</span>
            </div>
            {!isMobile && (
              <button
                onClick={togglePin}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {isPinned ? (
                  <Pin className="w-4 h-4" />
                ) : (
                  <PinOff className="w-4 h-4" />
                )}
              </button>
            )}
          </>
        )}
        {!isOpen && (
          <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

  

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {superAdminMenuItems.map((item) => (
          <div key={item.path || item.name} className="relative">
            {item.subItems && item.subItems.length > 0 ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                    openDropdown[item.name]
                      ? "bg-slate-700 text-white"
                      : "hover:bg-slate-800 text-slate-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 min-w-[1.25rem]" />
                  {isOpen && (
                    <>
                      <span className="ml-3 flex-1 text-left">{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown[item.name] ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                {isOpen && openDropdown[item.name] && (
                  <div className="mt-1 space-y-1 pl-4">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                          location.pathname === subItem.path
                            ? "bg-blue-600 text-white"
                            : "text-slate-200 hover:bg-slate-700 hover:text-white"
                        }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span className="ml-2">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors text-sm ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800 text-slate-100"
                }`}
              >
                <item.icon className="w-5 h-5 min-w-[1.25rem]" />
                {isOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Admin Info & Logout */}
      <div className="p-4 border-t border-slate-700">
   
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          {isOpen && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default React.memo(SuperAdminSidebar);