import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import './Featured.css'

const Featured = () => {
  return (
    <section className='featured-items bg-fixed text-white '>
      <div className="bg-opacity-70 bg-black px-32 pt-10 pb-20">
        <SectionTitle 
          subHeading={"Check it out"} 
          heading={"FROM OUR MENU"}
        ></SectionTitle>
        <div className="md:flex justify-between items-center">
          <div className="">
            <img src="https://i.ibb.co.com/HzjDWQf/featured.jpg" alt="" className="" />
          </div>
          <div className="md:ml-10 space-y-2">
            <p className="font-semibold text-xl"> March 20, 2023 WHERE CAN I GET SOME?</p>
            <p className=""> Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur. </p>
            <button className='border-b-2 rounded-lg p-3 hover:bg-white hover:text-black font-semibold'> Order Now </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;