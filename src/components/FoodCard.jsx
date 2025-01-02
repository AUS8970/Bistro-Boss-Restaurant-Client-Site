import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({item, title}) => {
  const {_id, name, recipe, image, category, price} = item;
  return (
    <div id={_id} className=''>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure> <img src={image} className='w-full' alt={category} /> </figure>
        <p className="bg-slate-900 text-center absolute right-3 top-3 px-2 py-1 rounded"> ${price} </p>
        <div className="card-body text-center">
          <h2 className="font-semibold text-xl text-center">{name}</h2>
          <p> {recipe} </p>
          <div className="card-actions justify-center">
            <Link to={`/order/${title}`} className='border-b-2 rounded-lg p-3 bg-slate-800 hover:bg-white hover:text-black font-semibold uppercase'> Add To Card </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;