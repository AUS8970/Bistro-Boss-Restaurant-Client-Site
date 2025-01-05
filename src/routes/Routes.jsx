import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import Order from "../pages/order/Order";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import Cart from "../pages/dashboard/Cart";
import AllUsers from "../pages/dashboard/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'menu',
        element: <Menu />
      },
      {
        path: 'order/:category',
        element: 
        // <PrivateRoute> 
          <Order /> 
        // {/* </PrivateRoute> */}
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute> <Dashboard /> </PrivateRoute>,
    children: [
      // users routs
      {
        path: 'cart',
        element: <Cart />,
      },
      //admin routs
      {
        path: 'allUsers',
        element: <AllUsers />,
      },
    ]
  }
]);