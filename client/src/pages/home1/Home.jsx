import { HelpingHand, HomeIcon, Layers, Settings } from "lucide-react";

// components
import { AppLayout } from "../../components/ui/AppLayout";
import { SideNav } from "../../components/ui/SideNav";


const Home = () => {

  return (
    <>
      <AppLayout
        sidebar={
          <SideNav
            tabIcons={[
              <HomeIcon
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
            ]}
          />
        }
        column1={
             <h2>This is the home</h2>
        }
        column2={
            <h1>Home Page content</h1>
          }
      />
    </>
  );
};


export default Home