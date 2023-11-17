/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import courtyard from '../../assets/courtyard.png'

const Home = ({ setSelectedLink }) => {

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    };

  return (
    <div className='w-[900px] pt-[2px]'>
      <p className='font-[Inter] font-normal text-[18px] leading-10 tracking-wide dark:text-[#ffffffc2]'>
      <span className='font-medium'>ASHESI iCONNECT</span> aims to enhance communication and issue resolution within the Ashesi University community. This application provides a platform for students, faculty, and staff to report various issues, such as maintenance requests, safety concerns, academic inquiries, and more, to the appropriate departments or categories for efficient and timely resolution. <Link to="/about" className="text-[#00000085] dark:text-[#ffffffac]" onClick={()=>handleLinkClick('about')} >Read more...</Link>
      </p>
      <img src={courtyard} alt="ashesi courtyard" className='my-8' />
    </div>
  )
}

export default Home
