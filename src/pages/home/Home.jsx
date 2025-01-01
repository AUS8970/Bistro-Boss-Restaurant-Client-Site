import React from 'react';
import Banner from './Banner';
import Category from './Category';
import PolpularMenu from './PolpularMenu';
import Featured from './Featured';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <PolpularMenu />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;