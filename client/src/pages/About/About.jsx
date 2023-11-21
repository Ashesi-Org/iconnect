import courtyard from '../../assets/courtyard.png'
import { Nfc, Home, Layers, Settings, Contact, HelpCircle } from "lucide-react";
// components
import { AppLayout } from "../../components/ui/AppLayout";
import { SideNav } from "../../components/ui/SideNav";
import { ContentScrollable } from "../../components/ui/ContentScrollable";
import ComplaintsContent from "../../components/complaints/ComplaintsContent";
import { CourseData } from "../../utils/Data";
import TopTagBar from "../../components/complaints/TopTagBar";

const About = () => {
  return (
    <>
      <AppLayout
        sidebar={
          <SideNav
            tabIcons={[
              <Home
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
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
              />,
            ]}
          />
        }

        column={
            <AboutContent />
          }
      />
    </>
  )
}

export default About


const AboutContent = () => {
  return (
    <div className='flex flex-col w-full pt-[20px]'>
      <div className='h-full pt-[2px] flex justify-center flex-col'>
      <p className='font-[Inter] font-normal text-[18px] leading-10 tracking-wide dark:text-[#ffffffc2]'>
      <span className='font-medium'>ASHESI iCONNECT</span> aims to enhance communication and issue resolution within the Ashesi University community. This application provides a platform for students, faculty, and staff to report various issues, such as maintenance requests, safety concerns, academic inquiries, and more, to the appropriate departments or categories for efficient and timely resolution.
      </p>
      <div className="flex gap-5">
       
        <img src={courtyard} alt="ashesi courtyard" className='my-8' />
      </div>
    </div>
    </div>
  )
}