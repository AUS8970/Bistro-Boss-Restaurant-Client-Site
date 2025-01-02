import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/Cover';
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle';
import MenuCategory from './MenuCategory';

const Menu = () => {

  const [menu, loading] = useMenu();
  const dessert = menu.filter(item => item.category === "dessert");
  const soup = menu.filter(item => item.category === "soup");
  const pizza = menu.filter(item => item.category === "pizza");
  const salad = menu.filter(item => item.category === "salad");
  const offered = menu.filter(item => item.category === "offered");

  return (
<div>
  <Helmet> <title> Bistro Boss | Menu </title> </Helmet>
  <Cover img={"https://i.ibb.co.com/9NJG2Tv/banner3.jpg"} title={"Our Menu"} />
  <SectionTitle subHeading={"Don't miss"} heading={"TODAY'S OFFER"} />
  <MenuCategory items={offered} />
  <MenuCategory items={dessert} title={"dessert"} coverImg={"https://i.ibb.co.com/5474D2V/dessert-bg.jpg"} />
  <MenuCategory items={pizza} title={"pizza"} coverImg={"https://i.ibb.co.com/n8Fv69Y/category-pizza.jpg"} />
  <MenuCategory items={salad} title={"salad"} coverImg={"https://i.ibb.co.com/MgwDhhz/salad-bg.jpg"} />
  <MenuCategory items={soup} title={"soup"} coverImg={"https://i.ibb.co.com/NNR2RfD/soup-bg.jpg"} />
</div>
  );
};

export default Menu;