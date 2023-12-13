import React, { useState } from 'react'
import SearchBox from '../ui/SearchBox'


const TopTagBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState  ('');

  const handleInputChange = async (event) => {
    const { value } = event.target;
    setSearchValue(value);
    await onSearch(value); // Pass the search value to the parent component
  };

  return (
    <div className='w-full flex gap-5 p-5 justify-between shadow-sm'>
      <h3>Your Complaints</h3>
      <SearchBox
        placeholder={"Search with keywords"}
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TopTagBar;
