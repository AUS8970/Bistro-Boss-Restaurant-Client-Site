import { PureComponent } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaUsers, FaWallet } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { CiDeliveryTruck } from 'react-icons/ci';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'pink'];

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

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };
  
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map(data => {
    return { name: data.category, value: data.revenue }
  })

  console.log(chartData)

  return (
    <div>
      <h2 className="text-3xl">
        <span> Hi! Welcome </span>
        {
          user ? user?.displayName : 'Back'
        }
      </h2>
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
      <div className="flex">
        {/* Bar Chart */}
        <div className="w-1/2">
          <BarChart width={500} height={300} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={colors[index % 5]} />))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
         <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

// menuItems
// orders
// revenue
// users
