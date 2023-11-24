import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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
const getStatusIndicator = (status) => {
  const statusColorsMap = {
    open: "bg-red-500",
    "in-progress": "bg-yellow-500",
    resolved: "bg-green-500",
    closed: "bg-gray-500",
  };

  const statusColor = statusColorsMap[status] || "";

  return (
    <span className={`px-2 py-1 text-xs text-white rounded ${statusColor}`}>
      {status}
    </span>
  );
};

const getPriorityIndicator = (priority) => {
  let priorityColor = "";
  switch (priority) {
    case "high":
      priorityColor = "bg-red-500";
      break;
    case "medium":
      priorityColor = "bg-yellow-500";
      break;
    case "low":
      priorityColor = "bg-green-500";
      break;
    default:
      break;
  }
  return (
    <span className={`px-2 py-1 text-xs text-white rounded ${priorityColor}`}>
      {priority}
    </span>
  );
};

const ComplaintsContent = ({ complaintData, pageSize }) => {
  const { user: current_user } = useContext(userContext);
  const isAdmin = current_user?.role === "administrator";
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [activeIssues, setActiveIssues] = useState({});
  const [filteredData, setFilteredData] = useState(complaintData);
  // const [appliedFilter, setAppliedFilter] = useState({ category: "", status: "" });
  console.log(complaintData)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [issueToDelete, setIssueToDelete] = useState(null);

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
  };

  const openDeleteConfirmation = (issue) => {
    setIssueToDelete(issue);
    setDeleteConfirmationVisible(true);
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationVisible(false);
    setIssueToDelete(null);
  };

  const confirmDelete = (issueId) => {
    // Handle deletion logic here, such as making an API call
    console.log(`Deleting issue with ID ${issueId}`);
    closeDeleteConfirmation(); // Close the delete confirmation dialog
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
              issueId={selectedIssue.issue_id}
              issueTitle={selectedIssue.title}
              issueDescription={selectedIssue.description}
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
          <div className="flex flex-col space-y-4 bg-app-background-1  text-app-white p-5">
            <p>Are you sure you want to delete this issue?</p>
            <p>This action cannot be undone.</p>
            <p className="font-bold">
              AIS {issueToDelete?.issue_id} : {issueToDelete?.title}
            </p>
            <div className="flex justify-end space-x-2">
              <ButtonM
                onClick={() => confirmDelete(issueToDelete.issue_id)}
                className="bg-red-500 px-4 py-2 rounded-md"
              >
                Confirm
              </ButtonM>
              <ButtonM
                onClick={closeDeleteConfirmation}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </ButtonM>
            </div>
          </div>
        }
      ></AppDialog>
    </div>
  );
};

export default ComplaintsContent;
