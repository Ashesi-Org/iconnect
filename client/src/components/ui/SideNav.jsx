import { LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { useContext, useState } from "react";
import { DASHBOARD, HOME, COMPLAINTS, ROOMS } from "../../utils/Routes";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { userContext } from "../../contexts/UserContext";

export const SideNav = ({ profile, tabIcons, routes }) => {
  const {user:auth_user} = useContext(userContext)
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="text-white py-5 bg-app-background-2 w-[50px] sticky bottom-0 h-screen max-h-screen shadow-app_shadow flex flex-col items-center justify-between">
      <div className="flex flex-col item-center w-full justify-center">
        <Logo width={"50px"} height={"50px"} />
      </div>

      <div className="flex flex-col items-center space-y-2 w-full">
        {tabIcons?.map((icon, index) => (
          <TabButton
            key={index}
            icon={icon}
            index={index}
            isActive={activeTab == index}
            setActiveTab={setActiveTab}
            route={routes[index]}
          />
        ))}
      </div>
      <div className="flex flex-col items-center space-y-4 w-full">
        <Profile
          profile={{
            avatarUrl: auth_user?.avatarUrl
          }}
        />
        <TabButton
          icon={<LogOut size={20} className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" />}
          index={tabIcons?.length}
          isActive={activeTab == tabIcons?.length}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export const Profile = ({ profile }) => {
  return (
    <div className="w-[25px] h-[25px] rounded-full bg-app-background-1 ring-2 cursor-pointer active:scale-90 transition-all duration-50 ease-in">
      <img
        src={profile?.avatarUrl}
        className="w-full h-full object-contain rounded-full "
      />
    </div>
  );
};


export const TabButton = ({ icon, index, isActive, setActiveTab, route }) => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigation = () => {
    navigate(`/${route}`)
  };

  return isActive ? (
    <div
      onClick={() => {
        setActiveTab(index);
        handleNavigation();
        console.log(index);
      }}
      className="w-full py-2 px-2 bg-app-background-1 group flex items-center justify-center border-r-2 border-app-brown cursor-pointer"
    >
      {icon}
    </div>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() => {
              setActiveTab(index);
              handleNavigation();
              console.log(index);
            }}
            className="w-full py-2 px-2 flex items-center group hover:bg-app-hover justify-center cursor-pointer"
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{route}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

  );
};

