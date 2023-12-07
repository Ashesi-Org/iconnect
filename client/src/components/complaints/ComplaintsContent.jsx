import React, { useState, useContext, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Settings, Trash2, Edit } from "lucide-react";
import { userContext } from "../../contexts/UserContext";
import moment from "moment";
import ComplaintsStatistics from "./ComplaintStatistics";
import AppDialog from "../ui/AppDialog";
import ButtonM from "../ui/ButtonM";
import EditComplaint from "./EditComplaint";
import UpdateComplaintStatus from "./UpdateComplaintStatus";
import ComplaintsFilter from "./ComplaintsFilter";
import { categories } from "../hotline-room/hotline-feed/Constants";
import DeleteIssue from "./DeleteIssue";
import { getPriorityIndicator, getStatusIndicator } from "./ComplaintStatusIndicator";
import { getInitials } from "../../utils/functions";


const ComplaintsContent = ({ complaintData, onIssueUpdated, onIssueDeleted}) => {
  const  navigate = useNavigate()
  const { user: current_user } = useContext(userContext);
  const isAdmin = current_user?.role === "administrator";
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filteredData, setFilteredData] = useState(complaintData);
  useMemo(() => {
    setFilteredData(complaintData);
  }, [complaintData]);

  console.log(complaintData)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);


  // Calculate statistics from complaintData
  const calculateStatistics = (data) => {
    let statistics = {
      open: 0,
      "in-progress": 0,
      resolved: 0,
      closed: 0,
    };

    data?.forEach((issue) => {
      statistics[issue.status]++;
    });

    return statistics;
  };

  const statistics = calculateStatistics(complaintData);
  const toggleComments = (issueId, categoryId) => {
    navigate(`/complaints/${issueId}?categoryId=${categoryId}`);
  };

  const filterDataByStatus = (status) => {
    const filtered = complaintData?.filter((issue) => issue.status === status);
    const remaining = complaintData?.filter((issue) => issue.status !== status);
    const rearrangedData = filtered.concat(remaining);
    setFilteredData(rearrangedData);
  };



  const openEditModal = (issue) => {
    setSelectedIssue(issue);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedIssue(null);
    onIssueUpdated();
  };

  const openDeleteConfirmation = (issue) => {
    setSelectedIssue(issue);
    setDeleteConfirmationVisible(true);

  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationVisible(false);
    setSelectedIssue(null);
    onIssueDeleted();
  };


  const openStatusModal = (issue) => {
    setSelectedIssue(issue);
    setStatusModalVisible(true);
  };

  const closeStatusModal = () => {
    setStatusModalVisible(false);
    setSelectedIssue(null);
  };

  const priorities = ["high", "medium", "low"]; 



  const applyFilter = (filters) => {
    let filtered = complaintData;

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((issue) =>
        filters.categories.includes(issue.category)
      );
    }

    // Apply priority filter
    if (filters.priorities.length > 0) {
      filtered = filtered.filter((issue) =>
        filters.priorities.includes(issue.priority)
      );
    }

    // Apply date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter((issue) =>
        moment(issue.created_at).isBetween(
          filters.dateRange.start,
          filters.dateRange.end
        )
      );
    }

    // Update the filtered data
    setFilteredData(filtered);
  };


  return (
    <div className="flex flex-shrink-0 flex-col gap-2 p-5">
      {complaintData?.length < 1 ? <p>you have no complaints raised yet</p>: 
      <><ComplaintsStatistics
          statistics={statistics}
          onClick={(status) => filterDataByStatus(status)} /><div className="flex flex-row gap-3">
            <div className="filter-sidebar w-1/4 ">
              <ComplaintsFilter
                categories={categories}
                priorities={priorities}
                onFilterChange={applyFilter} />
            </div>
            <div className="grid gap-4 flex-shrink-0 pb-5 rounded-xl w-3/4">
              {filteredData?.map((issue) => (
                <div
                  key={issue.issue_id}
                  className="text-app-white bg-app-background-2 p-5 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] cursor-pointer"
                >
                  <div
                    className="flex justify-between items-center"
                    onClick={() => toggleComments(issue.issue_id, issue.category_id)}
                  >
                    <h4 className="text-lg font-semibold ">
                      {getInitials(issue?.category.name)} {issue.issue_id}: {issue.title}
                      {issue.assignmentStatus === "Assigned" ? (
                        
                      <span className="text-xs pl-5 font-normal text-blue-800">{issue.assignmentStatus}</span>
                      ): <span className="text-xs pl-5 font-normal text-orange-600">{issue.assignmentStatus}</span>}
                    </h4>
                    <div className="flex p-1 gap-2">
                      {getStatusIndicator(issue.status)}
                      {getPriorityIndicator(issue.priority)}
                    </div>
                  </div>
                  <p className="text-gray-400 mt-2">{issue.description}</p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-500">
                      {moment(issue.created_at).fromNow()}
                    </span>
                    {/* Additional controls for the issue */}
                    <div className="flex gap-3">
                      {isAdmin ? (
                        <>
                          <span className="flex items-center">update status</span>
                          <Link to="#" className="flex items-center">
                            <Edit
                              size={18}
                              color="#215B90"
                              onClick={() => {
                                openStatusModal(issue);
                              } } />
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="#" className="flex items-center font-medium">
                            <Edit
                              size={18}
                              color="#215B90"
                              onClick={() => openEditModal(issue)} />
                          </Link>
                          <Link to="#" className="flex items-center">
                            <Trash2
                              size={18}
                              color="#A82F2F"
                              onClick={() => openDeleteConfirmation(issue)} />
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div></>}

      {/* Edit Dialog */}
      {editModalVisible && selectedIssue && (
        <AppDialog
          defaultOpen={editModalVisible}
          open={editModalVisible}
          setOpenChange={closeEditModal}
          content={
            <EditComplaint
              onIssueUpdated = {onIssueUpdated}
              priority={selectedIssue.priority}
              issueId={selectedIssue.issue_id}
              issueTitle={selectedIssue.title}
              issueDescription={selectedIssue.description}
              possiblePriorities={["low", "medium", "high"]}
              closeModal={closeEditModal}
            />
          }
        />
      )}

      {statusModalVisible && selectedIssue && (
        <AppDialog
          defaultOpen={statusModalVisible}
          open={statusModalVisible}
          setOpenChange={closeStatusModal}
          content={
            <UpdateComplaintStatus
              onIssueUpdated = {onIssueUpdated}
              issueId={selectedIssue?.issue_id}
              issueStatus={selectedIssue?.status}
              possiblepriorities={["open", "in-progress", "closed", "resolved"]}
              closeModal={closeStatusModal}
            />
          }
        />
      )}
      {/* Delete Confirmation Dialog */}
      <AppDialog
        defaultOpen={deleteConfirmationVisible}
        open={deleteConfirmationVisible}
        setOpenChange={closeDeleteConfirmation}
        content={
          <>
          <DeleteIssue  issueToDelete={selectedIssue} closeDeleteConfirmation={closeDeleteConfirmation}/>
          </>
        }
      ></AppDialog>
    </div>
  );
};

export default ComplaintsContent;
