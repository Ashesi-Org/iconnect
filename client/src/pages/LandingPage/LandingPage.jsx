/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import AppDialog from '../../components/ui/AppDialog';
import heroImg from '../../assets/hero2.svg'
import { Logo } from '../../components/ui/Logo';
import Login from '../auth/Login';


const LandingPage = () => {
    const [loginModalVisible, setLoginModalVisible] = useState(false)

    const openLoginModal = () => {
        setLoginModalVisible(true);
    };

    const closeLoginModal = () => {
        setLoginModalVisible(false);
    };


    return (
         
        
        <div className='no-scrollbar flex flex-col w-screen h-screen overflow-x-hidden bg-app-background-1 '>
                <nav className="border-b w-full h-20 flex justify-between items-center p-3 flex md:items-center ml-3 space-x-2 lg:space-x-3 xl:space-x-6 absolute md:static bg-transparent md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in top-20">
                    <div className='flex gap-1'>
                        <Logo width={30} height={30} />
                        <span className="relative text-[22px] font-normal mr-10 text-black">
                            &nbsp;iConnect
                            <span className="absolute text-[10px] px-1 text-green-400">Beta</span>
                        </span>

                    </div>
                    <div className="flex items-center gap-6 text-app-white ">
                        <span className='cursor-pointer'>Home</span>
                        <span className='cursor-pointer'>About</span>
                        <span className='cursor-pointer'>Help</span>
                        <button className="font-semibold text-app-brown rounded-lg px-10 p-2" onClick={openLoginModal}>
                            Login
                        </button>
                    </div>
                </nav>
                <section className=" w-full p-20 app-background-1 flex  items-center justify-center  h-[800px]">
                    <div className=" flex items-center h-full mb-10 flex justify-center ">
                        <div className='w-3/5  gap-5'>

                            <div className=" flex flex-col gap-5 ">
                                <h2 className="font-semibold text-5xl tracking-normal text-black flex gap-2 flex-col">
                                    Seamless. Swift.

                                    <span className="font-semibold text-5xl tracking-normal text-red-900">
                                        Elevate your Ashesi experience
                                    </span>
                                    <p className="text-black"> with Ashesi iConnect</p>
                                </h2>
                                <h3 className="my-2 text-lg text-app-white">
                                    where communication meets resolution for a thriving and  a vibrant campus community tailored for you!
                                </h3>
                            </div>
                            <button className="font-semibold my-4 bg-red-900 text-white rounded-lg px-10 p-3">
                                Register
                            </button>
                        </div>

                        <img src={heroImg} className='2/5 h-full blur-edges' />

                    </div>
                </section>

                /
                <AppDialog
                    open={loginModalVisible}
                    defaultOpen={loginModalVisible}
                    setOpenChange={closeLoginModal}
                    content={<Login />} />

            </div>
    );
};

export default LandingPage;




