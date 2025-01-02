import React from 'react';
import MenuItem from '../../shared/MenuItem';
import Cover from '../../shared/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items, title, coverImg}) => {
  return (
    <div className={title ? "pt-8" : ""}>
      {title && <Cover img={coverImg} title={title} />}
      <div className="grid mg:grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
        { items.map(item => <MenuItem  key={item._id}  item={item} ></MenuItem> )}
      </div>
      <div className="flex items-center justify-center mt-5">
        <Link to={`/order/${title}`} className='border-b-2 rounded-lg p-3 hover:bg-white hover:text-black font-semibold uppercase'> Order Your Favourite Food </Link>
      </div>
    </div>
  );
};

export default MenuCategory;