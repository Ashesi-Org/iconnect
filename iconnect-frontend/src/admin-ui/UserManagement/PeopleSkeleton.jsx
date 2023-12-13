import React from 'react';

const TableLoader = () => {
  return (
    <div className="animate-pulse">
     
      <div className="bg-gray-200 h-10 w-full mb-4 rounded"></div>

      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex w-full mb-4">
          <div className="bg-gray-200 h-8 w-5/12 rounded mr-2"></div>
          <div className="bg-gray-200 h-8 w-3/12 rounded mr-2"></div>
          <div className="bg-gray-200 h-8 w-1/12 rounded mr-2"></div>
          <div className="bg-gray-200 h-8 w-3/12 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default TableLoader;
