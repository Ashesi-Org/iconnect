import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Eye } from "lucide-react";
const Notification = ({ issueId,notificationId, content, isRead, createdAt }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-start  flex-col justify-between space-x-1 my-4 text-app-white border-b border-gray-200">
      <div className="flex items-start w-full space-x-3 cursor-pointer">
        <div className="w-full">{content}</div>
        <Eye color="#B0D9B1" size={20}
        
        onClick={() => {
          navigate(`/complaints/${issueId}`);
        }}
        />
         
      </div>
      <div className="text-xs text-gray-400">{moment(createdAt).fromNow()}</div>

      {!isRead && (
        <div className="w-3 h-3 rounded-full text-app-white self-center"></div>
      )}
    </div>
  );
};

export default Notification;
