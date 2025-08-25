import {
  LayoutDashboard,
  Users2,
  UserCog,
  Calendar,
  ClipboardList,
  CarTaxiFront,
  Building2,
  Route,
  MessageCircleCode
} from 'lucide-react';

// Module to menu item mapping
export const moduleMenuMap = {
  'admin-dashboard': { 
    path: '/dashboard', 
    name: 'Dashboard', 
    icon: LayoutDashboard 
  },
  'role-management': { 
    path: '/role-management', 
    name: 'Role Management', 
    icon: UserCog 
  },
  'manage-team': { 
    path: '/manage-team', 
    name: 'Manage Team', 
    icon: Users2 
  },
  'scheduling-management': { 
    path: null, // Parent with children has no direct path
    name: 'Scheduling', 
    icon: Calendar 
  },
  'manage-shift': { 
    path: '/manage-shift', 
    name: 'Manage Shifts', 
    icon: Calendar 
  },
  // 'manage-shift-categories': { 
  //   path: '/shift-categories', 
  //   name: 'Shift Categories', 
  //   icon: ClipboardList 
  // },
  'manage-drivers': { 
    path: '/manage-drivers', 
    name: 'Manage Drivers', 
    icon: CarTaxiFront 
  },
  'manage-vendors': { 
    path: '/manage-vendors', 
    name: 'Manage Vendors', 
    icon: Building2 
  },
  'manage-vehicles': { 
    path: '/manage-vehicles', 
    name: 'Vehicle Management', 
    icon: Calendar 
  },
  'routing': { 
    path: '/routing', 
    name: 'Routing', 
    icon: Route 
  },
  'tracking': { 
    path: '/tracking', 
    name: 'Tracking', 
    icon: MessageCircleCode 
  },
  'audit-report': { 
    path: '/audit-report', 
    name: 'Audit Report', 
    icon: ClipboardList 
  }
};

// Generate menu items from allowed modules
export const generateMenuItems = (allowedModules) => {
  const menuItems = [];
  
  allowedModules.forEach(module => {
    if (!module.canRead) return;
    
    const menuConfig = moduleMenuMap[module.id];
    if (!menuConfig) return;
    
    const menuItem = { 
      ...menuConfig,
      permissionModule: module.id
    };
    
    // Handle parent modules with children
    if (module.children && module.children.length > 0) {
      menuItem.subItems = module.children
        .filter(child => child.canRead && moduleMenuMap[child.id])
        .map(child => ({
          ...moduleMenuMap[child.id],
          permissionModule: child.id
        }));
    }
    
    // Only add if it's a top-level item or has subItems
    if (menuItem.path || (menuItem.subItems && menuItem.subItems.length > 0)) {
      menuItems.push(menuItem);
    }
  });
  
  return menuItems;
};