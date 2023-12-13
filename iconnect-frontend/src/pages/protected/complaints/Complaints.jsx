import { useMemo, useCallback, useEffect, useState, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import debounce from "lodash/debounce";

// components
import { AppLayout } from "../../../components/ui/AppLayout";
import { ContentScrollable } from "../../../components/ui/ContentScrollable";
import ComplaintsContent from "../../../components/complaints/ComplaintsContent";
import TopTagBar from "../../../components/complaints/TopTagBar";
import Loader from "../../../components/ui/Loader";
import { api } from "../../../api";
import { userContext } from "../../../contexts/UserContext";
import AppSideBar from "../../../components/common/AppSideBar";
import {SkeletonLoader} from "../../../components/complaints/ComplaintsContent";


const fetchUserIssues = async (userId, role) => {
 
  try {
    let endpoint = '';
    switch (role) {
      case 'administrator':
        endpoint = '/api/issues/';
        break;
      case 'resolver':
        endpoint = `/api/issues/department/${userId}`;
        break;
      default:
        endpoint = `/api/issues/user/${userId}`;
    }    

    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }  
};  


const Complaints = () => {
  const { user, userLoading } = useContext(userContext);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();
  const { data: issueData, isLoading, isError, refetch } = useQuery(
    ['userIssues', user?.userId, user?.role],
    async () => await fetchUserIssues(user?.userId, user?.role),
    {
      enabled: !!user?.userId && !!user?.role,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Error fetching user issues:', error);
      },
    }
  );

  const handleSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    [setSearchTerm]
  );

  const filteredIssues = useMemo(() => {
    // if (!searchTerm || !issueData) return issueData;

    return issueData?.filter(issue => {
      // Ensure issue properties are strings before calling toLowerCase()
      const category = String(issue?.category?.name || '').toLowerCase();
      const title = String(issue?.title || '').toLowerCase();
      const description = String(issue?.description || '').toLowerCase();

      // Perform case-insensitive search
      return (
        category.includes(searchTerm.toLowerCase()) ||
        title.includes(searchTerm.toLowerCase()) ||
        description.includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, issueData]);

  // Refetch data when user or role changes
  useEffect(() => {
    refetch();
  }, [refetch, user?.userId, user?.role]);

  const handleIssueDeleted = useCallback(() => {
    queryClient.invalidateQueries('userIssues');
  }, [queryClient]);

  if (isError) {
    return <div>Error fetching user issues</div>;
  }

  if (isLoading || !user) {

    return <Loader width={30} height={30} bgColor={'grey'} />;
  }

  if (!issueData) {
    return <div>No issues found</div>;
  }

  return (
    <AppLayout
      sidebar={<AppSideBar />}
      column={
        <ContentScrollable
          nav1={<TopTagBar onSearch={handleSearch} />} 
          content={
            <ComplaintsContent
              complaintData={filteredIssues} 
              onIssueDeleted={handleIssueDeleted}
            />
          }
        />
      }
    />
  );
};

export default Complaints;
