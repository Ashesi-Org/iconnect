import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

// components
import { HOME, LOGIN, REGISTER, COMPLAINTS,ABOUT, SUBMITCOMPLAINT, EDITCOMPLAINT, NOTIFICATIONS, PROFILE,SIMON, TEST, ROOMS, ROOM } from "./utils/Routes";
import Simon from "./pages/Simon";
import Analytics from './admin-ui/analytics/Analytics'
import "./App.css";
// import { Test } from "./pages/Test";
import { Login, HomePage, Register, Notifications, Complaints, About, SubmitComplaint, Profile, EditComplaint, Room, } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";
import HotLineRooms from "./pages/hotlinerooms/HotLineRooms";



function App() {

  const [selectedLink, setSelectedLink] = useState(null);
  const [inbox, setInbox] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleDarkModeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    darkModeQuery.addEventListener('change', handleDarkModeChange);
    setIsDarkMode(darkModeQuery.matches); // Set initial value

    return () => {
      darkModeQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  const [queryClient] = useState(() => new QueryClient());
  return (
      
        <div className='flex h-full' onClick={()=>setInbox(false)}>
            {inbox ? <Notifications setInbox={setInbox} /> : null}
            <Routes>
              <Route path={HOME} element={<HomePage setSelectedLink = {setSelectedLink} />} />
              <Route path={ABOUT} element={<About />} />
              <Route path={COMPLAINTS} element={<Complaints />} />
              <Route path={EDITCOMPLAINT} element={<EditComplaint />} />
              <Route path={SUBMITCOMPLAINT} element={<SubmitComplaint isDarkMode={isDarkMode} />} />
              <Route path={NOTIFICATIONS} element={<Notifications />} />
              <Route path= {PROFILE} element={<Profile />} />
              <Route path= {ROOM} element={<Room/>} />
              <Route path = {ROOMS} element = {<HotLineRooms />}/>
              <Route path={LOGIN} element={<Login />} />
              <Route path={REGISTER} element={<Register />} />
              {/* <Route path={TEST} element={<Test />} /> */}
              <Route path={SIMON} element={<Simon />} />
              <Route path={ANALYTICS} element={<Analytics />} />
            </Routes>
      </div>
  );
}

export default App;
