/* eslint-disable react/prop-types */
import ComplaintForm from "../../components/complaintForm/ComplaintForm"
import { Nfc, Home, Layers, Settings, Contact,HelpCircle } from "lucide-react";
// components
import { AppLayout } from "../../components/ui/AppLayout";
import { SideNav } from "../../components/ui/SideNav";
import { ContentScrollable } from "../../components/ui/ContentScrollable";
import ComplaintsContent from "../../components/complaints/ComplaintsContent";
import { CourseData } from "../../utils/Data";
import TopTagBar from "../../components/complaints/TopTagBar";

const SubmitComplaint = ({isDarkMode}) => {
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
            <SubmitCont />
          }
      />
    </>
  )
}

export default SubmitComplaint

const SubmitCont = () => {
  return (
    <div className="w-full h-[603px] pt-[2px] dark:text-[#ffffffc2]">
      <h2 className="font-[Inter] font-bold text-[28px] mb-4">General Complaints</h2>
      <p className='font-[Inter] font-normal text-[18px] leading-10 tracking-wide dark:text-[#ffffffc2]'>
      General grievances encompass a wide range of concerns and complaints that members of Ashesi University may have during their affiliation with the institution. These complaints are not specific to one particular area but may relate to various aspects of university life, policies, services, or interactions. <span className="text-[#00000085] dark:text-[#ffffffac] cursor-pointer">Read more ...</span>
      </p>
      <ComplaintForm />
    </div>
  )
}

