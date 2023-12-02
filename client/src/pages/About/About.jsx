import courtyard from '../../assets/courtyard.png'
// components
import { AppLayout } from "../../components/ui/AppLayout";
import AppSideBar from '../../components/common/AppSideBar';

const About = () => {
  return (
    <>
      <AppLayout
        sidebar={
          <AppSideBar
          />
        }

        column={
            <AboutContent />
          }
      />
    </>
  )
}

export default About


const AboutContent = () => {
  return (
    <div className='flex flex-col w-full pt-[20px]'>
      <div className='h-full pt-[2px] flex justify-center flex-col'>
      <p className='font-[Inter] font-normal text-[20px] leading-10 tracking-wide text-app-white'>
      <span className='font-medium'>ASHESI iCONNECT</span> aims to enhance communication and issue resolution within the Ashesi University community. This application provides a platform for students, faculty, and staff to report various issues, such as maintenance requests, safety concerns, academic inquiries, and more, to the appropriate departments or categories for efficient and timely resolution.
      </p>
      <div className="flex gap-5">
       
        <img src={courtyard} alt="ashesi courtyard" className='my-8' />
      </div>
    </div>
    </div>
  )
}