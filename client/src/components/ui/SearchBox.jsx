import React from 'react';
import { Search } from 'lucide-react'; 

const SearchBox = ({ placeholder, onSearch }) => {
  return (
    <div className="flex items-center bg-app-background-3">
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        className="rounded-l px-4 py-2 outline-none"
      />
      <button
        onClick={onSearch}
        className="bg-app-brown text-white px-4 py-2.5 rounded-r hover:bg-app-hover-green"
      >
        <Search size={20} /> 
      </button>
    </div>
  );
};

export default SearchBox;
