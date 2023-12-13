import React, {useContext} from "react";
import { Eye, LogOut, Settings, View } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Profile } from "../ui/SideNav";
import { userContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const { user } = useContext(userContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center cursor-pointer">
            <Profile profile={{ avatarUrl: user?.avatarUrl }} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} className="w-50 cursor-pointer gap-1 mr-2 flex flex-col bg-app-brown text-white font-bold">
        <DropdownMenuItem className="w-full items-center flex justify-center hover:bg-app-background-1">
            <h2 className="text-lg">welcome {user?.displayName}</h2>
        </DropdownMenuItem>
          <div className="flex items-center ">
                <DropdownMenuItem className="w-1/3 flex items-center justify-center">
                <DropdownMenuLabel>
                    <Link to="/profile">
                    <Eye className="cursor-pointer " width={18} height={18} />
                    </Link>
                </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-1/3 flex items-center justify-center">
                <DropdownMenuLabel >
                    <Settings  className="cursor-pointer" width={18} height={18} />
                </DropdownMenuLabel>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-1/3 flex items-center justify-center">
                <DropdownMenuLabel>
                    <LogOut className="cursor-pointer" width={18} height={18} />
                </DropdownMenuLabel>
                </DropdownMenuItem>

          </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
