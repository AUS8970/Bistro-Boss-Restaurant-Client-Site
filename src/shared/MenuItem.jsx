import React from 'react';

const MenuItem = ({item}) => {
  const {_id, name, recipe, image, category, price} = item;
  return (
    <div id={_id} className='flex items-center space-x-6'>
      <img src={image} alt={category} className="w-[100px] rounded-tr-[200px] rounded-b-[200px] h-24" />
      <div className="">
        <h2 className='text-xl uppercase'> {name}--------- </h2>
        <p className=""> {recipe} </p>
      </div>
      <p className="text-yellow-500"> ${price} </p>
    </div>
  );
};

export default MenuItem;