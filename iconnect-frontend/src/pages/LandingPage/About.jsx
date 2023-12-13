import { Link } from 'react-router-dom';
import { AppLayout } from "../../components/ui/AppLayout";
import AppSideBar from '../../components/common/AppSideBar';

const About = ({ setSelectedLink }) => {
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
      <div className='flex flex-col lg:flex-row '>
        <div className='w-full lg:w-3/4 pt-6 lg:pt-0'>
          <p className='font-inter font-normal text-base lg:text-lg leading-7 lg:leading-8 tracking-wide text-app-white p-3'>
            <span className='font-medium'>ASHESI iCONNECT</span> aims to enhance communication and issue resolution within the Ashesi University community. This application provides a platform for students, faculty, and staff to report various issues, such as maintenance requests, safety concerns, academic inquiries, and more, to the appropriate departments or categories for efficient and timely resolution.{' '}
            <Link to="/about" className="text-[#00000085] dark:text-[#ffffffac]" onClick={() => handleLinkClick('about')}>
              Read more...
            </Link>
          </p>
        </div>
      </div>
  );
};

export default About;
