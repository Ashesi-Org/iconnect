// components
import { AppLayout } from "../../components/ui/AppLayout";
import { ContentScrollable } from "../../components/ui/ContentScrollable";
import ComplaintsContent from "../../components/complaints/ComplaintsContent";
import TopTagBar from "../../components/complaints/TopTagBar";
import Loader from "../../components/ui/Loader";
import { api } from "../../api";
import { userContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { useQuery } from "react-query";
import AppSideBar from "../../components/common/AppSideBar";

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
        sidebar={<AppSideBar />}
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
