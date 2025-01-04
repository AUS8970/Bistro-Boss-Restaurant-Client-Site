import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useCart from '../hooks/useCart';

const FoodCard = ({item, title}) => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const {_id, name, recipe, image, category, price} = item;

  const handleAddToCart = () => {
    if(user && user.email) {
      const cartItem = {
        menuId : _id,
        email: user.email,
        name,
        image,
        price,
      }
      axiosSecure.post('/carts', cartItem)
      .then(res => {
        console.log(res.data)
        if(res.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500
          });
          // refetch card
          refetch()
        };
      });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', {state: {from: location}});
        }
      });
    }
  };

  return (
    <div id={_id} className=''>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure> <img src={image} className='w-full' alt={category} /> </figure>
        <p className="bg-slate-900 text-center absolute right-3 top-3 px-2 py-1 rounded"> ${price} </p>
        <div className="card-body text-center">
          <h2 className="font-semibold text-xl text-center">{name}</h2>
          <p> {recipe} </p>
          <div className="card-actions justify-center">
            <button 
              onClick={handleAddToCart}
              className='border-b-2 rounded-lg p-3 bg-slate-800 hover:bg-white hover:text-black font-semibold uppercase'
            >
              Add To Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;