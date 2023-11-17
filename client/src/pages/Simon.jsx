import React from 'react'
import { Home, Layers, HelpingHand, Settings } from 'lucide-react';
import { AppLayout } from '../components/ui/AppLayout';
import { SideNav } from '../components/ui/SideNav';


const Simon = () => {
    
  return (

    <AppLayout sidebar={<SideNav tabIcons={[
              <Home
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
              <Layers
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
              <HelpingHand
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
              <Settings
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
            ]}/>} column2={<PageContent />}>
    </AppLayout>   
  )
}

export default Simon

const PageContent = () =>{
    return (
      <div >

        
      </div>
    );
}