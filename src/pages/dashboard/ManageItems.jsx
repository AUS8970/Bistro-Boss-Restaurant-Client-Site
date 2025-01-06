import { FaTrashAlt, FaEdit } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMenu from "../../hooks/useMenu";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ManageItems = () => {

  const [ menu, loading, refetch ] = useMenu();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleUpdateItem = id => {
    navigate(`/dashboard/updateItems/${id}`)
  }
  
  const handleDeleteItem = id => {
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
        axiosSecure.delete(`/menu/${id}`)
        .then(res => {
          if(res.data.deletedCount > 0){
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            refetch();
          };
        });
      };
    });
  }

  return (
    <div>
      <SectionTitle heading={"MANAGE ALL ITEMS"} subHeading={"Hurry Up"} />
      <div className="flex items-center justify-between p-3">
        <h2 className="text-4xl"> Total Items: 
          {menu.length}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th> Sl. No. </th>
              <th> Item Image </th>
              <th> Item Name </th>
              <th> Price </th>
              <th> Update </th>
              <th> Delete </th>
            </tr>
          </thead>
          <tbody>
            {
              menu.map((item, idx) =><tr key={item._id}>
                <td> {idx + 1} </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold"> {item.name}</div>
                </td>
                <td> ${item.price} </td>
                <td> { item.role === 'admin' ? 'Admin' : 
                  <button 
                  onClick={() => handleUpdateItem(item._id)} 
                  className="btn bg-orange-400 text-white text-lg">
                    <FaEdit />
                  </button> }
                </td>
                <td>
                  <button 
                  onClick={() => handleDeleteItem(item._id)} 
                  className="btn bg-red-600 text-white text-lg">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>)
            };
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;