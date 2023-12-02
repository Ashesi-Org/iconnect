/* eslint-disable react/prop-types */
import { useState } from 'react';
import profile from '../../../src/assets/profile.jpg';
import { Nfc, Home, Layers, Settings, Contact, HelpCircle, Pencil, Bell, ShieldCheck, ChevronRight } from "lucide-react";
// components
import { AppLayout } from "../../components/ui/AppLayout";
import AppSideBar from '../../components/common/AppSideBar';

const Profile = () => {
  return (
    <>
      <AppLayout
        sidebar={
          <AppSideBar
          />
        }
        
        column={
            <ProfileContent />
          }
      />
    </>
  )
}

const ProfileContent = () => {
  const [ clicked, setClicked ] = useState(false);
  return (
    <div className='flex flex-row'>
      <ProfileSidebar clicked={clicked} setClicked={setClicked} />
      <div className="my-2 mx-10 w-full">
        <h2 className='text-[#333] text-[1.5rem] font-bold'>Edit Profile</h2>
        <div className='flex justify-center mt-2'>
            <div className='absolute'>
                <img src={profile} alt="profile" width={100} height={100}  className="rounded-full border-solid border-2 border-blue-300"/>
                <div className="w-[35px] h-[35px] rounded-full bg-[#7C0001] absolute top-16 right-[-5px] flex justify-center items-center cursor-pointer"><Pencil color='#fff' size={20} /></div>
            </div>
            <ProfileForm />
        </div>
      </div>
    </div>
  )
}


const ProfileSidebar = ({clicked, setClicked}) => {
    return (
        <div className="w-[300px] min-h-screen text-[1rem] font-semibold block pl-4 opacity-50 border-r-[1.3px] border-[#b9b8b8]">
            <ul className="list-none">
                <li className='' onClick={()=> setClicked((prev) => !prev)}><ProfileLink icon={<Pencil />} text="Edit Profile" clicked={<ChevronRight />}/></li>
                <li onClick={()=> setClicked((prev) => !prev)}><ProfileLink icon={<Bell />} text="Notifications" /></li>
                <li onClick={()=> setClicked((prev) => !prev)}><ProfileLink icon={<Settings />} text="Settings" /></li>
                <li onClick={()=> setClicked((prev) => !prev)}><ProfileLink icon={<ShieldCheck />} text="Password & Security" /></li>
            </ul>
        </div>
    )
}

const ProfileLink = ({icon, text, clicked}) => {
    return (
        <div className=''>
            <div className="flex flex-row items-center p-4 cursor-pointer">
                {icon}
                <p className='pl-5 w-[200px] flex flex-row justify-between  hover:font-bold'>{text} {clicked}</p>
            </div>
            <div className="w-[78%] ml-[3.6rem] border-b-[1.3px] border-[#b9b8b8]"></div>
        </div>
    )
}

const ProfileForm = () => {
  const inputStyles = 'outline-none rounded-md border-[1px] border-solid border-[#b6babb] py-[0.5rem] px-[1rem] bg-[#9fdff91d]';
    return (
        <form action="" method='GET' className='profile__form absolute top-[15.5rem] flex flex-col justify-center items-center'>
            <div className="flex flex-row w-[100%] gap-5 mb-4">
                <div className="flex flex-col w-[50%]">
                    <label className='mb-[0.5rem] font-semibold' htmlFor="fistName">First Name</label>
                    <input className={inputStyles} type="text" name="firstName" id="firstName" placeholder={'Abubakari Sadik'} />
                </div>
                <div className="flex flex-col w-[50%]">
                    <label className='mb-[0.5rem] font-semibold' htmlFor="lastName">Last Name</label>
                    <input className={inputStyles} type="text" name="lastName" id="lastName" placeholder={'Osman'} />
                </div>
            </div>
            <div className="flex flex-col w-[100%]">
                <label className='mb-[0.5rem] font-semibold' htmlFor="email">Email</label>
                <input className={`${inputStyles} mb-4`} type="email" name="email" id="email" placeholder={'abubakari.osman@ashesi.edu.gh'} />
                <label className='mb-[0.5rem] font-semibold' htmlFor="lastName">Contact Number</label>
                <input className={`${inputStyles} mb-4`} type='tel' name="contact" id="contact" placeholder={'+233 550 111 285'} />
                <label className='mb-[0.5rem] font-semibold' htmlFor="address">Address</label>
                <input className={`${inputStyles} mb-4`} type='text' name="address" id="address" placeholder={' NL 398 Lamashegu, Tamale'} />
            </div>
            <div className="flex flex-row w-[100%]  gap-5">
                <div className="flex flex-col w-[50%]">
                    <label className='mb-[0.5rem] font-semibold' htmlFor="city">City</label>
                    <input className={`${inputStyles} mb-4`} type="text" name="city" id="city" placeholder={'Tamale'} />
                </div>
                <div className="flex flex-col w-[50%]">
                    <label className='mb-[0.5rem] font-semibold' htmlFor="state">State/Region, Country</label>
                    <input className={`${inputStyles} mb-4`} type="text" name="state" id="state" placeholder={'Northern Region, Ghana'} />
                </div>
            </div>
            <div className="flex flex-col w-[100%]">
                <label className='mb-[0.5rem] font-semibold' htmlFor="password">Password</label>
                <input className={`${inputStyles} mb-4`} type="password" name="password" id="password" placeholder={'.........'} />
            </div>
            <button type="submit" className='bg-[#7C0001] rounded-[1rem] w-[40%] text-[1.2rem] text-white py-3 px-10 text-center'>Save</button>
        </form>
    )
}

export default Profile