import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {

  const [ isAdmin, isAdminLoading ] = useAdmin();
  const { user, loading } = useAuth();

  const location = useLocation();

  if( user && isAdmin ) {
    return children;
  }

  if (loading || isAdminLoading) {
    return <span className="progress w-56"></span>
  }

  return <Navigate to={"/login"} state={{from: location}} replace></Navigate>
};

export default AdminRoute;