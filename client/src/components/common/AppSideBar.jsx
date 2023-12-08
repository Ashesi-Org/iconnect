import React, { useContext, useMemo } from 'react';
import { SideNav } from '../ui/SideNav';
import { userContext } from '../../contexts/UserContext';
import {
  COMPLAINTS,
  CONTACT,
  HELP,
  HOME,
  ROOMS,
  ADDISSUE,
  CALENDAR,
  PEOPLE,
  ANALYTICS,
  REPORTS
} from '../../utils/Routes';
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
  Activity,
  BookCheck
} from 'lucide-react';
const useFilteredRoutesAndIcons = () => {
  const { user: auth_user } = useContext(userContext);

  const isAdmin = auth_user?.role === 'administrator';
  const isStudent = auth_user?.role === 'student';
  const isResolver = auth_user?.role === 'resolver';

  const routes = useMemo(() => [
    { path: HOME, name: 'Home' },
    { path: ADDISSUE, name: 'Add Issue' },
    { path: COMPLAINTS, name: 'Complaints' },
    { path: ROOMS, name: 'Rooms' },
    { path: PEOPLE, name: 'People' },
    { path: CALENDAR, name: 'Calendar' },
    { path: ANALYTICS, name: 'Analytics' },
    { path: REPORTS, name: 'Reports' },
    { path: HELP, name: 'Help' },
    { path: CONTACT, name: 'Contact' },
    { path: '/settings', name: 'Settings' }
  ], []);

  const tabIcons = useMemo(() => [
    <Home className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <PlusCircle className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Layers className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Nfc className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Users2 className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Calendar className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Activity className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <BookCheck className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <HelpCircle className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Contact className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
    <Settings className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />
  ], []);

  const filteredRoutes = useMemo(() => {
    // if (isAdmin) return routes.filter(route => !['People', 'Calendar', 'Analytics', 'Reports'].includes(route.name));
    if (isStudent) return routes.filter(route => !['People','Calendar', 'Analytics', 'Reports'].includes(route.name));
    if (isResolver || isAdmin) return routes;

    return routes;
  }, [routes, isAdmin, isStudent, isResolver]);

  const filteredTabIcons = useMemo(() => {
    // if (isAdmin) return tabIcons.filter((_, index) => index !== 4); 
    if (isStudent) return tabIcons.filter((_, index) => index !== 5 && index !== 6 && index !== 7 && index !== 4);
    if (isResolver || isAdmin) return tabIcons;

    return tabIcons;
  }, [tabIcons, isAdmin, isStudent, isResolver]);

  return { filteredRoutes, filteredTabIcons };
};

const AppSideBar = () => {
  const { filteredRoutes, filteredTabIcons } = useFilteredRoutesAndIcons();

  return (
    <SideNav routes={filteredRoutes} tabIcons={filteredTabIcons} />
  );
};

export default AppSideBar;
