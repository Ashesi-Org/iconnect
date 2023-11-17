import courtyard from '../../assets/courtyard.png'

const About = () => {
  return (
    <div className='h-full pt-[2px] flex justify-center'>
      <p className='font-[Inter] font-normal text-[18px] leading-10 tracking-wide dark:text-[#ffffffc2]'>
      <span className='font-medium'>ASHESI iCONNECT</span> aims to enhance communication and issue resolution within the Ashesi University community. This application provides a platform for students, faculty, and staff to report various issues, such as maintenance requests, safety concerns, academic inquiries, and more, to the appropriate departments or categories for efficient and timely resolution.
      </p>
      <div className="flex gap-5">
       
        <img src={courtyard} width={500} alt="ashesi courtyard" className='my-8' />
      </div>
    </div>
  )
}

export default About
