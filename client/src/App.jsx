import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import { HOME, LOGIN, COMPLAINT, REGISTER, COMPLAINTS,ABOUT, PAGENOTFOUND, PROFILE,SIMON, ROOMS, ROOM, ANALYTICS, ADDISSUE, CALENDAR, ASSIGNED, LANDINGPAGE } from "./utils/Routes";
import Simon from "./pages/Simon";
import Analytics from './admin-ui/analytics/Analytics'

// import { Test } from "./pages/Test";
import { Login, HomePage, Register,  Complaints, About, SubmitComplaint, Profile, Room, PageNotFound, ComplaintDetails, LandingPage } from "./pages";

import HotLineRooms from "./pages/hotlinerooms/HotLineRooms";
import HotlineRoom from "./pages/room/HotlineRoom";
import CalendarPage from "./pages/calendar/Calendar";
import AssignedIssues from "./admin-ui/AssignedIssues/AssignedIssues";



function App() {

  const [selectedLink, setSelectedLink] = useState(null);
 
  const [isDarkMode, setIsDarkMode] = useState(false);
return (
      
        <div className='flex h-full no-scrollbar' >
            <Routes>
              <Route path={HOME} element={<HomePage setSelectedLink = {setSelectedLink} />} />
              <Route path={LANDINGPAGE} element={<LandingPage />} />
              <Route path={ABOUT} element={<About />} />
              <Route path={COMPLAINTS} element={<Complaints />} />
              <Route path={ADDISSUE} element={<SubmitComplaint isDarkMode={isDarkMode} />} />
              <Route path= {PROFILE} element={<Profile />} />
              
              <Route path= {ROOM} element={<HotlineRoom/>} />
              <Route path = {ROOMS} element = {<HotLineRooms />}/>
              <Route path={LOGIN} element={<Login />} />
              <Route path={REGISTER} element={<Register />} />
              <Route path={PAGENOTFOUND} element={<PageNotFound />} />
              <Route path={SIMON} element={<Simon />} />
              <Route path={ANALYTICS} element={<Analytics />} />
              <Route path={CALENDAR} element={<CalendarPage />} />
              <Route path={COMPLAINT} element={<ComplaintDetails />}/>
              <Route path={ASSIGNED} element={<AssignedIssues />} />  
            </Routes>
      </div>
  );
}

export default App;
