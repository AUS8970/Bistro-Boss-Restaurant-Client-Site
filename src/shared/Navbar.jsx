import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Navbar = () => {

  const { user, logOut } = useAuth();
  const [ isAdmin ] = useAdmin();
  const [ cart ] = useCart();

  const handleLogOut = () => {
    logOut()
    .then(() => {})
    .catch(err => console.log(err))
  }

  const links = <>
    <li><NavLink to={'/'}> Home </NavLink></li>
    <li><NavLink to={'/contact'}> Contact us </NavLink></li>
    {/* user and admin */}
    { user && isAdmin && <li><NavLink to={'/dashboard/adminHome'}> Dashboard </NavLink></li>}
    {/* user but not admin */}
    { user && !isAdmin && <li><NavLink to={'/dashboard/userHome'}> Dashboard </NavLink></li>}
    <li><NavLink to={'/menu'}> Our Menu </NavLink></li>
    <li><NavLink to={'/order/salad'}> Order Food </NavLink></li>
  </>

  return (
    <div className="navbar bg-black text-white fixed z-10 max-w-screen-xl opacity-70">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <a className="btn text-white btn-ghost text-xl"> Bistro Boss </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {
          user ? <>
            <Link to={'/dashboard/cart'}>
              <div className="btn btn-ghost bg-white hover:bg-slate-300 text-black flex items-center gap-1"> <FaShoppingCart /> +{cart.length} </div>
            </Link>
            <button onClick={handleLogOut} className="btn btn-ghost"> Logout </button>
          </> : <>
            <Link to={"/login"} className="btn btn-ghost"> Login </Link>
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;