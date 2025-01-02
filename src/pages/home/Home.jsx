import React from 'react';
import Banner from './Banner';
import Category from './Category';
import PolpularMenu from './PolpularMenu';
import Featured from './Featured';
import Testimonials from './Testimonials';
import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/Cover';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Bistro Boss | Home </title>
      </Helmet>
      <Banner />
      <Category />
      <Cover img={"https://i.ibb.co.com/9NJG2Tv/banner3.jpg"} title={"Bistro Boss"} />
      <PolpularMenu />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;