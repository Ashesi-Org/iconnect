import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AppLayout } from "../../components/ui/AppLayout";
import AppSideBar from "../../components/common/AppSideBar";
import IssueDetailedContent from "../../components/complaints/IssueDetailedContent";
import IssueAssignee from "../../components/complaints/IssueAssignee";
import { ContentScrollable } from "../../components/ui/ContentScrollable";
import { api } from "../../api";
import MapContainer from "../../components/complaints/MapContainer";
import GoogleMap from "../../components/complaints/GoogleMap";


// /issue_resolvers/:categoryId
const ComplaintDetails = () => {
  const { issueId } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  console.log(categoryId)

  const { data: categoryResolvers } = useQuery("resolvers", async () => {
    const response = await api.get(`/api/categories/issue_resolvers/${categoryId}`);
    return response.data;
  });


  const { data: issueDetails } = useQuery("issueDetails", async () => {
    const response = await api.get(`/api/issues/${issueId}`);
    return response.data;
  });

  console.log(categoryResolvers)
  const pinCoordinates = [5.75763, 0.22118];
  const place = { name: 'Ashesi Nutor Hall' };
  return (
    <AppLayout
      sidebar={<AppSideBar />}
      column={
        <div className="p-4 bg-white shadow flex text-gray-600 gap-8">
          <div className="w-2/3">
            <ContentScrollable content={<IssueDetailedContent issue={issueDetails?.issue} />} />
          </div>
          <div className="w-1/3 flex flex-col">
            <ContentScrollable
              content={
                <div className="flex flex-col gap-6">
                  <IssueAssignee
                    privacy={issueDetails?.issue?.is_anonymous ? "Anonymous" : "Public"}
                    // category_name={issueDetails?.issue.category.name}
                    issueId={issueId}
                    assignees={issueDetails?.issue?.assignees ?? []}
                    availableResolvers={categoryResolvers}

                  />
                  <p className="text-gray-600 font-medium text-xl">Location Specified</p>
                   <GoogleMap place={place} />
                  {/* <MapContainer pinCoordinates={pinCoordinates} /> */}
                </div>
              }
            />  
          </div>
        </div>
      }
    />
  );
};

export default ComplaintDetails;
