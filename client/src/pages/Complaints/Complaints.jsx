import { Nfc, Home, Layers, Settings, Contact,HelpCircle } from "lucide-react";
// components
import { AppLayout } from "../../components/ui/AppLayout";
import { SideNav } from "../../components/ui/SideNav";
import { ContentScrollable } from "../../components/ui/ContentScrollable";
import ComplaintsContent from "../../components/complaints/ComplaintsContent";
import { CourseData } from "../../utils/Data";
import TopTagBar from "../../components/complaints/TopTagBar";
import Loader from "../../components/ui/Loader";
import { api } from "../../api";
import { userContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "react-query";

const fetchUserIssues = async (userId) => {
  try {
    const response = await api.get(`/api/issues/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


const Complaints = () => {
    const { user } = useContext(userContext); 

    const { data: issueData, isLoading, isError } = useQuery(
      ['userIssues', user.userId], 
      () => fetchUserIssues(user?.userId),
      { enabled: !!user?.userId } 
    );

    if (isLoading) {
      return <Loader bgColor="bg-app-brown" width={40} height={40}/>; 
    }

  return (

     <>
      <AppLayout
        sidebar={
          <SideNav
            routes =  {["home", "complaints", "hotline", "help", "contact", "settings"]}
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
            <ContentScrollable
              nav1={<TopTagBar />}
              content={<ComplaintsContent complaintData={issueData} />}
              // selectedContent={selectedContent}
            />
          }
      />
    </>
   
  )
}

export default Complaints
