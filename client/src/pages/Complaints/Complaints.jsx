import Complaint from "../../components/complaints/Complaint"
import { HelpingHand, Home, Layers, Settings, Contact,HelpCircle } from "lucide-react";
// components
import { AppLayout } from "../../components/ui/AppLayout";
import { SideNav } from "../../components/ui/SideNav";
import { ContentScrollable } from "../../components/ui/ContentScrollable";
import ComplaintsContent from "../../components/complaints/ComplaintsContent";
import { CourseData } from "../../utils/Data";
import Header from "../../components/header/Header";
import TopTagBar from "../../components/complaints/TopTagBar";



const Complaints = () => {
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
              <HelpingHand
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
            <ContentScrollable
              nav1={<TopTagBar />}
              content={<ComplaintsContent chapterData={CourseData} />}
              // selectedContent={selectedContent}
            />
          }
      />
    </>
   
  )
}

export default Complaints
