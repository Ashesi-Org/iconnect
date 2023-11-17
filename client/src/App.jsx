import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

// components
import { HOME, LOGIN, REGISTER, COMPLAINTS,ABOUT, SUBMITCOMPLAINT, EDITCOMPLAINT, NOTIFICATIONS, PROFILE,SIMON, TEST } from "./utils/Routes";
import Simon from "./pages/Simon";
import "./App.css";
import { Test } from "./pages/Test";
import { Login, Home, Register, Notifications, Complaints, About, SubmitComplaint, Profile, EditComplaint, } from "./pages";


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
  return (
      <Router>
        <div className='flex h-full' onClick={()=>setInbox(false)}>
            {inbox ? <Notifications setInbox={setInbox} /> : null}
            <Routes>
              <Route path={HOME} element={<Home setSelectedLink = {setSelectedLink} />} />
              <Route path={ABOUT} element={<About />} />
              <Route path={COMPLAINTS} element={<Complaints />} />
              <Route path={EDITCOMPLAINT} element={<EditComplaint />} />
              <Route path={SUBMITCOMPLAINT} element={<SubmitComplaint isDarkMode={isDarkMode} />} />
              <Route path={NOTIFICATIONS} element={<Notifications />} />
              <Route path= {PROFILE} element={<Profile />} />
              <Route path={SIMON} element={<Simon />} />
              <Route path={LOGIN} element={<Login />} />
              <Route path={REGISTER} element={<Register />} />
              <Route path={TEST} element={<Test />} />
            </Routes>
      </div>
    </Router>
  );
}

export default App;
