import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../../contexts/UserContext";
import { HOME } from "../../../utils/Routes";
import toast from "react-hot-toast";
import Loader from "../../../components/ui/Loader";

const AdminProtected = () => {
  const location = useLocation();
  const { user: current_user, userLoading: isCurrentUserLoading } = useContext(userContext);
  console.log(current_user);

  if (isCurrentUserLoading) {
    return <Loader bgColor="green" message={"checking..."} width={30} height={30} />;
  }
  if (!isCurrentUserLoading && current_user && current_user.role && current_user.role !== 'student') {
    return <Outlet />;
  } else {
    toast.error("Login as admin to access this page");
    return <Navigate to={HOME} state={{ from: location }} replace />;
  }
};

export default AdminProtected;
