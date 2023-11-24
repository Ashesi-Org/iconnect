import React from 'react'
import { COMPLAINTS, CONTACT, HELP, HOME, ROOMS, ADDISSUE } from '../../utils/Routes'
import { SideNav } from '../ui/SideNav'
import { Nfc, Home, Layers, Settings, Contact, HelpCircle, PlusCircle } from "lucide-react";
const AppSideBar = () => {
  return (
    <SideNav
      routes={[HOME, ADDISSUE, COMPLAINTS, ROOMS, HELP, CONTACT, "settings"]}
      // routes =  {["home", "complaints", "hotline", "help", "contact", "settings"]}
      tabIcons={[
        <Home
          className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
          size={20}
        />,
        <PlusCircle className="text-app-white group-active:scale-90 transition-all duration-50 ease-in" size={20} />,
        <Layers
          className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
          size={20}
        />,
        <Nfc
          className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
          size={20}
        />,
        <HelpCircle
          className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
          size={20}
        />,
        <Contact
          className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
          size={20}
        />,
        <Settings
          className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
          size={20}
        />]} />
  )
}

export default AppSideBar