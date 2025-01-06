import React from 'react';
import { FaHouse } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const errorGif = 'https://i.ibb.co.com/wLf8hzg/404.gif';

const Error = () => {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <img className='w-2/3' src={errorGif} alt="" />
      <Link to={"/"} className='flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 px-3 py-2 rounded-lg text-white'> <FaHouse /> Back To Home</Link>
    </div>
  );
};

export default Error;