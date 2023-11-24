import { Link } from 'react-router-dom';
import { ArrowDown, Bell } from 'lucide-react';
import { Profile } from '../ui/SideNav';
import { userContext } from '../../contexts/UserContext';
import { useContext, useState, useCallback, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import NotificationsSheet from '../common/NotificationsSheet';
import { useQuery } from 'react-query';
import useScreenType from '../../hooks/useScreenType';
import { api } from '../../api';

const NavBar = ({ selectedLink, setSelectedLink, setInbox }) => {
  const myDevice = useScreenType();
  const { user } = useContext(userContext);

  const handleLinkClick = (link) => setSelectedLink(link);

  const { data: notifications, isLoading: notificationsLoading } = useQuery(
    ["notifications", user?.userId],
    async () => {
      const { data } = await api.get(`/api/notification/${user.userId}`);
      return data;
    },
    { enabled: !!user }
  );

  const hasNewNotifications = notifications?.some(
    (notification) => !notification?.read
  );


  const handleBellClick = useCallback(() => {
    handleLinkClick('notifications');
    setInbox((prev) => !prev);
  }, [handleLinkClick, setInbox]);

  useEffect(() => {
    const markNotificationsAsRead = async () => {
      await api.patch(`/api/notification/markAsRead/${user?.userId}`);
      queryClient.invalidateQueries(["notifications", user?.userId]);
    };

    if (hasNewNotifications) {
      markNotificationsAsRead();
    }
  }, [user?.userId, hasNewNotifications]);

  return (
    <nav className="bg-app-background-2 fixed top-0 z-0 font-[Inter] h-[70px] w-full flex flex-row justify-between items-center px-8 border-solid border-b-neutral-100">
      <span className="relative text-[24px] font-bold mr-10">
        Ashesi&nbsp;iConnect
        <span className="absolute text-[10px] px-1 text-green-400">Beta</span>
      </span>
      <div className="navlinks font-medium text-[20px] flex ">
        <ul className="flex flex-row flex-grow-0 items-center font-extrabold text-xl text-app-white">
          <li className="hover:text-zinc-500 transition-colors">
            <Link to="/" className={selectedLink === 'home' ? 'selected' : ''} onClick={() => handleLinkClick('home')}>
              Home
            </Link>
          </li>
          <li className="hover:text-zinc-500 transition-colors">
            <Link to="/about" className={selectedLink === 'about' ? 'selected' : ''} onClick={() => handleLinkClick('about')}>
              About
            </Link>
          </li>
          <li className="hover:text-zinc-500 transition-colors">
            <Link to="/complaints" className={`flex flex-row items-center ${selectedLink === 'complaints' ? 'selected' : ''}`} onClick={() => handleLinkClick('complaints')}>
              My&nbsp;Complaints&nbsp;
              <ArrowDown />
            </Link>
          </li>
        </ul>
      </div>
      <Sheet  >
        <SheetTrigger asChild>
          <button
            onClick={handleBellClick}
            className="relative"
          >
            {hasNewNotifications && (
              <div className="w-2 h-2 rounded-full bg-green-600 absolute right-0.5 top-0"></div>
            )}
            <Bell
              size={23}
              className="text-[#424549] hover:text-app-brown cursor-pointer"
            />
          </button>
        </SheetTrigger>
        <SheetContent
        className="bg-app-background-2 transition-colors text-app-white"
          position={myDevice !== "isMobile" ? "right" : "bottom"}
          size={myDevice !== "isMobile" ? "sm" : "content"}
        >
          <SheetHeader>
            <SheetTitle>Notifications ✨</SheetTitle>
          </SheetHeader >
          <NotificationsSheet />
        </SheetContent>
      </Sheet>
      <Link to="/profile" className={`flex flex-row items-center dark:text-[#d9d9d9c7] pr-10 ${selectedLink === 'profile' ? 'selected' : ''}`} onClick={() => handleLinkClick('profile')}>
        <div className="bg-[#D9D9D9] w-[2px] h-[40px] mr-5 flex justify-between"></div>
        <Profile profile={{ avatarUrl: user?.avatarUrl }} />
        <div className="ml-4 text-app-white text-lg font-semibold">42112024</div>
      </Link>


    </nav>
  )
}

export default NavBar
