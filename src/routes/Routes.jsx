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
import AddItems from "../pages/dashboard/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/dashboard/ManageItems";
import UpdateItems from "../pages/dashboard/UpdateItems";
import Error from "../pages/error/Error";
import Payment from "../pages/dashboard/Payment";
import PaymentHistory from "../pages/dashboard/PaymentHistory";

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
      {
        path: '*',
        element: <Error />
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
      {
        path: 'payment',
        element: <Payment />,
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory />,
      },
      //admin routs
      {
        path: 'allUsers',
        element: <AdminRoute> <AllUsers /> </AdminRoute>,
      },
      {
        path: 'addItems',
        element: <AdminRoute> <AddItems /> </AdminRoute>,
      },
      {
        path: 'manageItems',
        element: <AdminRoute> <ManageItems /> </AdminRoute>,
      },
      {
        path: 'updateItems/:id',
        element: <AdminRoute> <UpdateItems /> </AdminRoute>,
        // loader: ({params}) => fetch(`${import.meta.env.VITE_API_BASE_URL}/menu/${params.id}`),
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: '*',
        element: <Error />
      },
    ]
  },
  {
    path: '*',
    element: <Error />
  },
]);