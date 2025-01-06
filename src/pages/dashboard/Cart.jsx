import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Cart = () => {

  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`)
        .then(res => {
          if(res.data.deletedCount > 0){
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch();
          }
        })
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-evenly">
        <h2 className="text-4xl"> 
          Total Orders: {cart.length}
        </h2>
        <h2 className="text-4xl"> 
          Total Price: {totalPrice}
        </h2>
        <button className="btn bg-orange-400 text-white"> PAY </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th> Sl. No. </th>
              <th> Item  Image </th>
              <th> Name </th>
              <th> Price</th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {
              cart.map((item, idx) =><tr key={item._id}>
                <td>
                  {idx + 1}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold"> {item.name}</div>
                </td>
                <td> ${item.price} </td>
                <th>
                  <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg text-red-600">
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;