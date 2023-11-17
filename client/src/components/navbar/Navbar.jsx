/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Profile } from '../ui/SideNav';


const NavBar = ({ selectedLink, setSelectedLink, setInbox, setAddImage }) => {

    const handleLinkClick = (link) => {
    setSelectedLink(link);
    };

    return (
        <nav className="bg-app-background-2 fixed top-0 z-0 font-[Inter] h-[70px] w-full flex flex-row justify-between items-center px-8 border-solid border-b-neutral-100" onClick={() => setAddImage(false)}>
            <div className="text-[24px] font-bold mr-10">
                Ashesi&nbsp;iConnect
            </div>
            <div className="navlinks font-medium text-[20px] flex ">
                <ul className='flex flex-row flex-grow-0 items-center    font-extrabold text-xl text-app-white'>
                    <li className='hover:text-zinc-500 transition-colors'>
                        <Link to="/" className={selectedLink === 'home' ? 'selected' : ''} onClick={() => handleLinkClick('home')}>
                            Home
                        </Link>
                    </li>
                    <li className='hover:text-zinc-500 transition-colors'>
                        <Link to="/about" className={selectedLink === 'about' ? 'selected' : ''} onClick={() => handleLinkClick('about')}>
                            About
                        </Link>
                    </li>
                    <li className='hover:text-zinc-500 transition-colors'>
                        <Link to="/complaints" className={`flex flex-row items-center ${selectedLink === 'complaints' ? 'selected' : ''}`} onClick={() => handleLinkClick('complaints')}>
                            My&nbsp;Complaints&nbsp;<ArrowDown />
                        </Link>
                    </li>
                    <li className='hover:text-zinc-500 transition-colors'>
                        <Link to="/submit-complaint" className={selectedLink === 'submit-complaint' ? 'selected' : ''} onClick={() => handleLinkClick('submit-complaint')}>
                            Submit&nbsp;Complaint
                        </Link>
                    </li>
                    <li className='hover:text-zinc-500 transition-colors'>
                        <div className={`absolute -mt-3 cursor-pointer`} onClick={() => {
                            handleLinkClick('notifications');
                            setInbox((prev) => !prev)}}>
                            <div className={`w-[7px] h-[7px] rounded-full absolute top-[1px] right-[4px] bg-[#800000]`}></div>
                            <Bell size={20}/>
                        </div>
                    </li>
                </ul>
                    
            </div>
            <Link to="/profile" className={`flex flex-row items-center dark:text-[#d9d9d9c7] pr-10 ${selectedLink === 'profile' ? 'selected' : ''}`} onClick={() => handleLinkClick('profile')}>
            <div className="bg-[#D9D9D9] w-[2px] h-[40px] mr-5 flex justify-between" ></div>
                <Profile
                    profile={{
                        avatarUrl:
                        "https://i.pinimg.com/236x/04/11/17/041117fffc8f8fff9a257e2fb9d593e2.jpg",
                    }}
                    />
                <div className='ml-4 text-app-white text-lg font-semibold'>
                    42112024
                </div>
            </Link>
        </nav>
    )
}

export default NavBar
