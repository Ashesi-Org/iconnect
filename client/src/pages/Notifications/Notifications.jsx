/* eslint-disable react/prop-types */
import { X } from 'lucide-react'
import { Filter } from 'lucide-react'

const Notifications = ({setInbox}) => {
  return (
    <div className="flex flex-col w-[310px] h-[600px] bg-[#e4e4e4c4] rounded-lg float-right absolute z-10 right-[8.3rem] -mt-5">
      <div className="notification__header w-full flex flex-row justify-between items-center px-5 py-3">
        <div>
        
        <img src={<Filter />} alt="Filter" height={30} width={30} onClick={() => setInbox((prev) => !prev)} className='cursor-pointer' />
        </div>
        <div>
          <img src={<X />} alt="Close" height={22} width={22} onClick={() => setInbox((prev) => !prev)} className='cursor-pointer' />
        </div>
      </div>

      {/* <div className="flex justify-between">
        <div className="flex justify-center w-[50px] bg-[#0007] text-white text-[12px] font-thin py-1  px-2 rounded-md z-10 float-right">Filter</div>
        <div className="flex justify-center w-[50px] bg-[#0007] text-white text-[12px] font-thin py-1  px-2 rounded-md z-10 float-right">Close</div>
      </div> */}
      <div className="">

      </div>
    </div>
  )
}

export default Notifications
