/* eslint-disable react/prop-types */
import ComplaintForm from "../../components/complaintForm/ComplaintForm"

const SubmitComplaint = ({isDarkMode}) => {
  return (
    <div className="w-[900px] h-[603px] pt-[2px] dark:text-[#ffffffc2]">
      <h2 className="font-[Inter] font-bold text-[28px] mb-4">General Complaints</h2>
      <p className='font-[Inter] font-normal text-[18px] leading-10 tracking-wide dark:text-[#ffffffc2]'>
      General grievances encompass a wide range of concerns and complaints that members of Ashesi University may have during their affiliation with the institution. These complaints are not specific to one particular area but may relate to various aspects of university life, policies, services, or interactions. <span className="text-[#00000085] dark:text-[#ffffffac] cursor-pointer">Read more ...</span>
      </p>
      <ComplaintForm isDarkMode={isDarkMode} />
    </div>
  )
}

export default SubmitComplaint
