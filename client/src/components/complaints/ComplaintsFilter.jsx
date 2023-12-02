import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ComplaintsFilter = ({ categories, statuses, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleCheckboxChange = (value, state, setState) => {
    const newState = [...state];
    if (newState.includes(value)) {
      newState.splice(newState.indexOf(value), 1);
    } else {
      newState.push(value);
    }
    setState(newState);
    onFilterChange({ categories: selectedCategories, statuses: selectedStatuses, dateRange });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange({ start, end });
    onFilterChange({ categories: selectedCategories, statuses: selectedStatuses, dateRange: { start, end } });
  };

  return (
    <div className="filter-container bg-app-background-2 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Filter by Department</h3>
      {categories?.map((category, index) => (
        <div key={index} className="mb-2">
          <input
            type="checkbox"
            id={`category-${index}`}
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCheckboxChange(category, selectedCategories, setSelectedCategories)}
            className="mr-2"
          />
          <label htmlFor={`category-${index}`}>{category}</label>
        </div>
      ))}
      <h3 className="text-lg font-semibold mb-2 mt-4">Filter by Status:</h3>
      {statuses.map((status, index) => (
        <div key={index} className="mb-2">
          <input
            type="checkbox"
            id={`status-${index}`}
            value={status}
            checked={selectedStatuses.includes(status)}
            onChange={() => handleCheckboxChange(status, selectedStatuses, setSelectedStatuses)}
            className="mr-2"
          />
          <label htmlFor={`status-${index}`}>{status}</label>
        </div>
      ))}
      <h3 className="text-lg font-semibold mb-2 mt-4">Date Range:</h3>
      <div className="mt-2">
        <DatePicker
          selected={dateRange.start}
          onChange={handleDateChange}
          startDate={dateRange.start}
          endDate={dateRange.end}
          selectsRange
          inline
        />
      </div>
    </div>
  );
};

export default ComplaintsFilter;
