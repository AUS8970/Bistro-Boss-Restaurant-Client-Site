import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {FaTrashAlt, FaUsers} from 'react-icons/fa'
import Swal from "sweetalert2";

const AllUsers = () => {
  
  const axiosSecure = useAxiosSecure();
  const {data: users = [], refetch} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res => {
      console.log(res.data)
      if(res.data.modifiedCount > 0){
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      };
    });
  };

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
          };
        });
      };
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <h2 className="text-4xl"> Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th> Sl. No. </th>
              <th> User Image </th>
              <th> User Name </th>
              <th> User Email </th>
              <th> Role </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, idx) =><tr key={user._id}>
                <td> {idx + 1} </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold"> {user.name}</div>
                </td>
                <td> {user.email} </td>
                <td> { user.role === 'admin' ? 'Admin' : 
                  <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-400 text-white text-lg">
                    <FaUsers />
                  </button> }
                </td>
                <td>
                  <button onClick={() => handleDelete(user._id)} className="btn bg-red-600 text-white text-lg">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;