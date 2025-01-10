import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUser, FaUsers, FaWallet } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { CiDeliveryTruck } from 'react-icons/ci';

const AdminHome = () => {

  const { user } = useAuth();

  const axiosSecure  = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats')
      return res.data;
    }
  });
  
  const { data: chartData = [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-stats')
      return res.data;
    }
  });

  console.log(chartData)

  return (
    <div>
      <h2 className="text-3xl">
        <span> Hi! Welcome </span>
        {
          user ? user?.displayName : 'Back'
        }
        <div className="stats shadow w-full my-4">

          {/* Revenue */}
          <div className="stat flex items-center justify-center">
            <div className="">
              <FaWallet />
            </div>
            <div className="">
              <div className="stat-value"> {(parseInt(stats.revenue))} </div>
              <div className="stat-title"> Revenue </div>
            </div>
          </div>

          {/* Customers */}
          <div className="stat flex items-center justify-center">
            <div className="">
              <FaUsers />
            </div>
            <div className="">
              <div className="stat-value"> {stats.users} </div>
              <div className="stat-title"> Customers </div>
            </div>
          </div>

          {/* Products */}
          <div className="stat flex items-center justify-center">
            <div className="">
              <MdProductionQuantityLimits />
            </div>
            <div className="">
              <div className="stat-value"> {stats.menuItems} </div>
              <div className="stat-title"> Products </div>
            </div>
          </div>

          {/* Orders */}
          <div className="stat flex items-center justify-center">
            <div className="">
              <CiDeliveryTruck />
            </div>
            <div className="">
              <div className="stat-value"> {stats.users} </div>
              <div className="stat-title"> Orders </div>
            </div>
          </div>
        </div>
      </h2>
    </div>
  );
};

export default AdminHome;

// menuItems
// orders
// revenue
// users
