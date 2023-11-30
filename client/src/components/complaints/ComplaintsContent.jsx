import React, { useState, useContext } from "react";
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


const ComplaintsContent = ({ complaintData, onIssueUpdated, onIssueDeleted}) => {
  const  navigate = useNavigate()
  const { user: current_user } = useContext(userContext);
  const isAdmin = current_user?.role === "administrator";
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeIssues, setActiveIssues] = useState({});
  const [filteredData, setFilteredData] = useState(complaintData);
  
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
  const toggleComments = (issueId) => {
    setActiveIssues((prev) => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));

    navigate(`/complaints/${issueId}`);
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

  const [appliedFilter, setAppliedFilter] = useState({
    categories: [],
    statuses: [],
    dateRange: [0, 100],
  });


const applyFilter = ({ categories, statuses, dateRange }) => {
  setAppliedFilter({ categories, statuses, dateRange });

  const startDate = dateRange.start;
  const endDate = dateRange.end;

  const filtered = complaintData?.filter((issue) => {
    const categoryFilter = categories.length === 0 || categories.includes(issue.category.name);
    const statusFilter = statuses.length === 0 || statuses.includes(issue.status);
    
    const createdAt = new Date(issue.created_at);

    const dateFilter = startDate === null || endDate === null || (createdAt >= startDate && createdAt <= endDate);

    return categoryFilter && statusFilter && dateFilter;
  });

  setFilteredData(filtered);
};


  const statuses = ["open", "in-progress", "resolved", "closed"]; 

  return (
    <div className="flex flex-shrink-0 flex-col gap-2 p-5">
      {complaintData?.length < 1 ? <p>you have no complaints raised yet</p>: 
      <><ComplaintsStatistics
          statistics={statistics}
          onClick={(status) => filterDataByStatus(status)} /><div className="flex flex-row gap-3">
            <div className="filter-sidebar w-1/4 ">
              <ComplaintsFilter
                categories={categories}
                statuses={statuses}
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
                    onClick={() => toggleComments(issue.issue_id)}
                  >
                    <h4 className="text-lg font-semibold ">
                      AIS {issue.issue_id}: {issue.title}
                      <span className="text-xs pl-5 font-normal text-orange-500">{issue.assignmentStatus}</span>
                    </h4>
                    <div className="flex p-1 gap-2">
                      {getStatusIndicator(issue.status)}
                      {getPriorityIndicator(issue.priority)}
                    </div>
                  </div>
                  <p className="text-gray-400 mt-2">{issue.description}</p>

                  {activeIssues[issue.issue_id] &&
                    issue.comments &&
                    issue.comments.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-md font-semibold">Comments</h5>
                        <div className="grid gap-3 mt-2">
                          {issue.comments.map((comment, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center bg-gray-200 p-3 rounded-lg"
                            >
                              <div>
                                <p>{comment.comment_text}</p>
                                <span className="text-gray-500 text-sm">
                                  {moment(comment.created_at).fromNow()}
                                </span>
                              </div>
                              {/*  */}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
              possibleStatuses={["open", "in-progress", "closed", "resolved"]}
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
