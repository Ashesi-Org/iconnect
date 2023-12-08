import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ComplaintsFilter = ({ categories, priorities, onFilterChange }) => {
 

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleCheckboxChange = (value, state, setState) => {
    const updatedState = [...state];
    if (updatedState.includes(value)) {
      updatedState.splice(updatedState.indexOf(value), 1);
    } else {
      updatedState.push(value);
    }
    setState(updatedState);
  };

  const handleDateChange = (dates) => {
    console.log(dates); 
    const [start, end] = dates;
    setDateRange({ start, end });
  };

  const applyFilters = () => {
    // Prepare the filter object based on selected options
    const filters = {
      categories: selectedCategories,
      priorities: selectedPriorities,
      dateRange,
    };

    // Pass the filters to the parent component
    onFilterChange(filters);
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
      {priorities.map((priority, index) => (
        <div key={index} className="mb-2">
          <input
            type="checkbox"
            id={`status-${index}`}
            value={priority}
            checked={selectedPriorities.includes(priority)}
            onChange={() => handleCheckboxChange(priority, selectedPriorities, setSelectedPriorities)}
            className="mr-2"
          />
          <label htmlFor={`status-${index}`}>{priority}</label>
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
      {/* Apply Filters button */}
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
      
  );
};

export default ComplaintsFilter;
