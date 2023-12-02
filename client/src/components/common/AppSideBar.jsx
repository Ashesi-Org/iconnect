import React, { useContext } from 'react';
import {
  COMPLAINTS,
  CONTACT,
  HELP,
  HOME,
  ROOMS,
  ADDISSUE,
  CALENDAR,
  PEOPLE,
  ANALYTICS
} from '../../utils/Routes';
import { SideNav } from '../ui/SideNav';
import {
  Nfc,
  Home,
  Layers,
  Settings,
  Contact,
  HelpCircle,
  PlusCircle,
  Calendar,
  Users2,
  Activity
} from 'lucide-react';
import { userContext } from '../../contexts/UserContext';

const AppSideBar = () => {
  const { user:auth_user } = useContext(userContext);

  const isAdmin = auth_user?.role === 'administrator';
  const isStudent = auth_user?.role === 'student';
  const isResolver = auth_user?.role === 'resolver';

  const tabIcons = [
    <Home className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <PlusCircle className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Layers className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Nfc className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Users2 className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Calendar className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Activity className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <HelpCircle className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Contact className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Settings className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />
  ];

  // Filter tabs based on user role
  const filteredTabIcons = tabIcons.filter((icon, index) => {
    if ((isAdmin || isStudent || isResolver) && (index === PEOPLE || index === CALENDAR || index === ANALYTICS)) {
      return false;
    }
    return true;
  });

  return (
    <SideNav
    routes={[
        { path: HOME, name: 'Home' },
        { path: ADDISSUE, name: 'Add Issue' },
        { path: COMPLAINTS, name: 'Complaints' },
        { path: ROOMS, name: 'Rooms' },
        { path: PEOPLE, name: 'People' },
        { path: CALENDAR, name: 'Calendar' },
        { path: ANALYTICS, name: 'Analytics' },
        { path: HELP, name: 'Help' },
        { path: CONTACT, name: 'Contact' },
        { path: '/settings', name: 'Settings' }
      ]}
      tabIcons={filteredTabIcons}
    />
  );
};

export default AppSideBar;
