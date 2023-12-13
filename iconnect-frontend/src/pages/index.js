import Complaints from "./protected/complaints/Complaints"
import Login from "./auth/Login"
import Register from "./auth/Register"
import SubmitComplaint from "./protected/complaints/SubmitComplaint"
import PageNotFound from "./errors/PageNotFound"
import People from "./protected/admin/people/People"
import Reports from "./protected/admin/reports/Reports"
import CalendarPage from "./protected/admin/calendar/Calendar"
import HotLineRooms from "./protected/hotlinerooms/HotLineRooms"
import HotLineRoom from "./protected/room/HotlineRoom"
import ComplaintDetails from "./protected/complaints/ComplaintDetails"  
import LandingPage from "./LandingPage/LandingPage"
import AssignedIssues from "../admin-ui/AssignedIssues/AssignedIssues";
import Protected from "./protected/Protected";
import Profile from "./protected/profile/Profile";
import Simon from "./Simon";
import Analytics from '../admin-ui/analytics/Analytics'
 

export {
    Simon,
    Analytics,
    AssignedIssues,
    Protected,
    Profile,
    Login,
    Register,
    Complaints,
    SubmitComplaint,
    PageNotFound,
    ComplaintDetails,
    People,
    Reports,
    CalendarPage,
    HotLineRooms,
    HotLineRoom,
    LandingPage 
}

