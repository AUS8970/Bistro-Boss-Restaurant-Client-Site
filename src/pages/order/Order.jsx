import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Cover from "../../shared/Cover";
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../hooks/useMenu";
import FoodCard from "../../components/FoodCard";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {

  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
  const {category} = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);

  const [menu, loading] = useMenu();
  
  const dessert = menu.filter(item => item.category === "dessert");
  const soup = menu.filter(item => item.category === "soup");
  const pizza = menu.filter(item => item.category === "pizza");
  const salad = menu.filter(item => item.category === "salad");
  const drinks = menu.filter(item => item.category === "drinks");

  return (
    <div>
      <Helmet> <title> Bistro Boss | Order Food </title> </Helmet>
      <Cover img={"https://i.ibb.co.com/71FGL4n/banner2.jpg"} title={"Order Food"} />
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab> Salad </Tab>
          <Tab> Pizza </Tab>
          <Tab> Soup </Tab>
          <Tab> Dessert </Tab>
          <Tab> Drinks </Tab>
        </TabList>
        <TabPanel> <OrderTab items={salad} /> </TabPanel>
        <TabPanel> <OrderTab items={pizza} /> </TabPanel>
        <TabPanel> <OrderTab items={soup} /> </TabPanel>
        <TabPanel> <OrderTab items={dessert} /> </TabPanel>
        <TabPanel> <OrderTab items={drinks} /> </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;