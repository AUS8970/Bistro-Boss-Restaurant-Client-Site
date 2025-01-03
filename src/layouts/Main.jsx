import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

const Main = () => {
  const location = useLocation();
  const hideHeaderFooder = location.pathname.includes('login') || location.pathname.includes('signup');
  return (
    <div>
      { hideHeaderFooder || <Navbar /> }
      <Outlet />
      { hideHeaderFooder || <Footer /> }
    </div>
  );
};

export default Main;