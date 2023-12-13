import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// components
import {
  HOME,
  LOGIN,
  COMPLAINT,
  REGISTER,
  COMPLAINTS,
  PAGENOTFOUND,
  PROFILE,
  SIMON,
  ROOMS,
  ROOM,
  ANALYTICS,
  ADDISSUE,
  CALENDAR,
  ASSIGNED,
  PEOPLE,
  REPORTS,
  ADMIN,
} from "./utils/Routes";

// import { Test } from "./pages/Test";
import {
  Login,
  CalendarPage,
  HotLineRooms,
  HotLineRoom,
  Register,
  Complaints,
  Reports,
  SubmitComplaint,
  PageNotFound,
  ComplaintDetails,
  People,
  LandingPage,
  AssignedIssues,
  Profile,
  Simon,
  Analytics,
  Protected,
} from "./pages";
import AdminProtected from "./pages/protected/admin/AdminProtected";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className="flex h-screen w-screen bg-app-background-1 overflow-hidden">
      <UserProvider>
      <Routes>
        <Route element={<Protected />}>
          <Route
            path={ADDISSUE}
            element={<SubmitComplaint isDarkMode={isDarkMode} />}
          />
          <Route path={PROFILE} element={<Profile />} />
          <Route path={ROOM} element={<HotLineRoom />} />
          <Route path={ROOMS} element={<HotLineRooms />} />
          <Route path={COMPLAINTS} element={<Complaints />} />
          <Route path={COMPLAINT} element={<ComplaintDetails />} />
        </Route>

        <Route path={ADMIN} element={<AdminProtected />}>
          <Route path={PEOPLE} element={<People />} />
          <Route path={REPORTS} element={<Reports />} />
          <Route path={ANALYTICS} element={<Analytics />} />
          <Route path={CALENDAR} element={<CalendarPage />} />
          <Route path={ASSIGNED} element={<AssignedIssues />} />
        </Route>

        <Route path={HOME} element={<LandingPage />} />
        <Route path={SIMON} element={<Simon />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={PAGENOTFOUND} element={<PageNotFound />} />
      </Routes>

      </UserProvider>
    </div>
  );
}

export default App;
