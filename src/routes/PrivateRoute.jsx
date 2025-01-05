import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {

  const { user, loading } = useAuth();
  
  const location = useLocation();

  if( user ) {
    return children;
  }

  if (loading) {
    return <span className="progress w-56"></span>
  }

  return <Navigate to={"/login"} state={{from: location}} replace></Navigate>
};

export default PrivateRoute;