import { Link } from 'react-router-dom'
import { Edit, Delete } from 'lucide-react'


const Complaint = ({subject, description, date, time}) => {
  return (
    <div className="w-[900px] font-[Inter] bg-[#F5F5F5] dark:bg-[#00000013] dark:text-[#ffffff90] rounded-xl my-4 py-4 pl-6 pr-14 leading-6 tracking-wide">
        <h3 className="font-semibold text-[18px] text-[#0000009]">
            {subject} <span></span>
        </h3>
        <p className="font-normal text-[16px my-3"> 
            {description}
        </p>
        <div className="flex flex-row justify-between items-center">
            <div className="w-[180px] h-[30px] bg-[#00000060] font-medium text-[14px] rounded-lg text-gray-200 dark:text-[#ffffff90]  flex justify-center items-center">
                <div>{time} on {date}</div>
            </div>
            <div className="flex flex-row justify-between w-[140px]">
                <Link to={'/edit-complaint'} className="flex flex-row items-center font-medium">
                    <p>Edit</p>
                    <Edit  height={22} width={22} />
                   
                </Link>
                <Link to={'/complaints'} className="flex flex-row items-center">
                    <p>Delete</p>
                    <Delete height={22} width={22} />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Complaint
