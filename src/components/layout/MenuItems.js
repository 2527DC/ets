import { LayoutDashboard, User, Users2, UserCog, UserPlus, Car, CarTaxiFront, Calendar, ClipboardList, Route, Building2, MessageCircleCode } from 'lucide-react';

export const menuItems = [
  { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard, permissionModule: 'dashboard' },
  { path: '/manage-shift', name: 'Manage Shift', icon: Calendar, permissionModule: 'manage-shift' },
  { path: '/shift-categories', name: 'Manage Shift Categories', icon: ClipboardList, permissionModule: 'manage-shift-categories' },
  { path: '/manage-team', name: 'Manage Team', icon: Users2, permissionModule: 'manage-team' },
  { path: '/role-management', name: 'Role Management', icon: Users2, permissionModule: 'role-management' },
  { path: '/manage-company', name: 'Manage Companies', icon: Users2, permissionModule: 'manage-company' },
];
