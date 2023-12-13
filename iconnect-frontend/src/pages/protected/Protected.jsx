import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import { LOGIN } from "../../utils/Routes";
import Loader from "../../components/ui/Loader";
import toast from "react-hot-toast";

const Protected = () => {
  const location = useLocation();
  const { user: current_user, userLoading: isCurrentUserLoading } = useContext(userContext);
  console.log(current_user);

  if (isCurrentUserLoading) {
    return <Loader bgColor="green" message={"caching..."} width={50} height={50} />;
  }
  if (!isCurrentUserLoading && current_user) {
    return <Outlet />;
  } else {
    toast.error("Login to access this page");
    return <Navigate to={LOGIN} state={{ from: location }} replace />;
  }
};

export default Protected;
