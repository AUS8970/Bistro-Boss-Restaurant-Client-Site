import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data : payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async() => {
      const res = await axiosSecure.get(`/payments/${user.email}`)
      return res.data;
    }
  });

  console.log(payments)

  return (
    <div>
      <div className="flex items-center m-3 ">
        <h2 className="text-4xl"> 
          Total Orders: {payments.length}
        </h2>
        {/* {
          payments.length > 0 && <Link to={"/dashboard/payment"} className="btn bg-orange-400 text-white"> PAY </Link>
        } */}
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th> Sl. No. </th>
              <th> Email </th>
              <th> Transaction Id </th>
              <th> Status </th>
              <th> Total Price</th>
              <th> Payment Date </th>
            </tr>
          </thead>
          <tbody>
            {
              payments.map((item, idx) =><tr key={item._id}>
                <td> {idx + 1} </td>
                <td> {item.email} </td>
                <td> {item.transactionId} </td>
                <td> {item.status} </td>
                <td> ${item.price} </td>
                <td> {item.date} </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

// cartIds
// date
// email
// menuItemIds
// length
// price
// status
// transactionId
// _id