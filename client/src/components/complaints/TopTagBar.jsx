import React from 'react'
import SearchBox from '../ui/SearchBox'

const TopTagBar = () => {
  return (
    <div className='w-full flex gap-5 p-5 justify-between shadow-sm'>
      <h3>Your Complaints</h3>
      <SearchBox placeholder={"Search with keywords"} />
    </div>
  )
}

export default TopTagBar

