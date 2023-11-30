import React from "react";

export const getStatusIndicator = (status) => {
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

export const getPriorityIndicator = (priority) => {
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