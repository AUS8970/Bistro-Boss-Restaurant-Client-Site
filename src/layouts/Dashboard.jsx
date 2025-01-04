import { FaCalendar, FaHome, FaList, FaShoppingBag, FaShoppingCart } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css'
import { MdMenu } from 'react-icons/md';
import { IoIosMail } from 'react-icons/io';
import useCart from '../hooks/useCart';

const Dashboard = () => {

  const [cart] = useCart();

  return (
    <div className='flex'>
      <div className="w-64 min-h-screen bg-orange-400 text-black">
        <ul className="menu">
          <li> <NavLink to={'/dashboard/userHome'}> <FaHome /> User Home </NavLink> </li>
          <li> <NavLink to={'/dashboard/reservation'}> <FaCalendar /> Reservation </NavLink> </li>
          <li> <NavLink to={'/dashboard/paymentHistory'}> <FaShoppingCart /> Payment History </NavLink> </li>
          <li> <NavLink to={'/dashboard/cart'}> <FaShoppingCart /> My Cart ({cart.length})  </NavLink> </li>
          <li> <NavLink to={'/dashboard/review'}> <FaShoppingCart /> Add Review </NavLink> </li>
          <li> <NavLink to={'/dashboard/bookings'}> <FaList />  My Booking </NavLink> </li>
          <div className="divider"></div>
          <li> <NavLink to={'/'}> <FaHome />  Home  </NavLink> </li>
          <li> <NavLink to={'/order/salad'}> <MdMenu />  Menu  </NavLink> </li>
          <li> <NavLink to={'/'}> <FaShoppingBag /> Shop </NavLink> </li>
          <li> <NavLink to={'/'}> <IoIosMail />  Contact  </NavLink> </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;