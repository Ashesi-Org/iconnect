import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { formatTimeAgo } from '../../utils/functions';
import moment from 'moment';
import ComplaintsStatistics from './ComplaintStatistics';
import EditModal from './EditComplaintModal';

const getStatusIndicator = (status) => {
  // Map of status values to their corresponding background colors
  const statusColors = {
    'open': 'bg-red-500',
    'in-progress': 'bg-yellow-500',
    'resolved': 'bg-green-500',
    'closed': 'bg-gray-500'
  };

  // Get the background color for the given status
  const statusColor = statusColors[status] || '';

  // Return a span element with the status text and appropriate background color
  return (
    <span className={`px-2 py-1 text-xs text-white rounded ${statusColor}`}>
      {status}
    </span>
  );
};

const getPriorityIndicator = (priority) => {
  let priorityColor = '';
  switch (priority) {
    case 'high':
      priorityColor = 'bg-red-500';
      break;
    case 'medium':
      priorityColor = 'bg-yellow-500';
      break;
    case 'low':
      priorityColor = 'bg-green-500';
      break;
    default:
      break;
  }
  return <span className={`px-2 py-1 text-xs text-white rounded ${priorityColor}`}>{priority}</span>;
};

const ComplaintsContent = ({ complaintData, pageSize }) => {
  const [activeIssues, setActiveIssues] = useState({});
  const [filteredData, setFilteredData] = useState(complaintData);
    // Calculate statistics from complaintData
  const calculateStatistics = (data) => {
    let statistics = {
      'open': 0,
      'in-progress': 0,
      'resolved': 0,
      'closed': 0,
    };

    data.forEach((issue) => {
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
  const filtered = complaintData.filter((issue) => issue.status === status);
  const remaining = complaintData.filter((issue) => issue.status !== status);
  const rearrangedData = filtered.concat(remaining);
  setFilteredData(rearrangedData);
};



  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Function to open the edit modal
  const openEditModal =  (issue) => {
    setSelectedIssue(issue);
    console.log(issue.issue_id);
    setEditModalVisible(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedIssue(null);
  };


  return (
    <div className='flex flex-shrink-0 flex-col gap-2 p-5'>
        <ComplaintsStatistics statistics={statistics}  onClick={(status) => filterDataByStatus(status)} />
       
      <div className="grid gap-4 flex-shrink-0 pb-5 w-full rounded-xl">
        {filteredData.map((issue) => (
          <div key={issue.issue_id} className="text-app-white bg-app-background-2 p-5 rounded-lg shadow-lg cursor-pointer" onClick={() => toggleComments(issue.issue_id)}>
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold " >
                AIS {issue.issue_id}: {issue.title}
              </h4>
              <div className="flex gap-2">
                {getStatusIndicator(issue.status)}
                {getPriorityIndicator(issue.priority)}
              </div>
            </div>
            <p className="text-gray-400 mt-2">{issue.description}</p>
               
              {activeIssues[issue.issue_id] && issue.comments && issue.comments.length > 0 && (
              <div className="mt-3">
                <h5 className="text-md font-semibold">Comments</h5>
                <div className="grid gap-3 mt-2">
                  {issue.comments.map((comment, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-200 p-3 rounded-lg">
                      <div>
                        <p>{comment.comment_text}</p>
                        <span className="text-gray-500 text-sm">{moment(comment.created_at).fromNow()}</span>
                      </div>
                      {/* Additional controls if needed */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">{moment(issue.created_at).fromNow()}</span>
              {/* Additional controls for the issue */}
              <div className="flex gap-3">
                <Link to="#" className="flex items-center font-medium" onClick={() => openEditModal(issue)}>
                  <Pencil size={18} color='#215B90' />
                </Link>
                <Link to={`#`} className="flex items-center">
                  <Trash2 size={18} color='#A82F2F' />
                </Link>
              </div>
            </div>
{editModalVisible && selectedIssue && (
                  <EditModal
                    issueId={selectedIssue.issue_id}
                    issueTitle={selectedIssue.title}
                    issueDescription={selectedIssue.description}
                    closeModal={closeEditModal}
                  />
                )}
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default ComplaintsContent;
