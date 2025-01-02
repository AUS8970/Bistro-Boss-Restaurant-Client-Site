import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import MenuItem from "../../shared/MenuItem";
import useMenu from "../../hooks/useMenu";

const PolpularMenu = () => {
  const [menu, loading] = useMenu();
  const popular = menu.filter(item => item.category === "popular")

  return (
    <section className="mb-12">
      <SectionTitle subHeading={"Check it out"} heading={"FROM OUR MENU"}></SectionTitle>
      <div className="grid mg:grid-cols-1 lg:grid-cols-2 gap-10">
        { popular ? (
          popular.map(item => <MenuItem  key={item._id} item={item} ></MenuItem>)
        ) : (
          <p className=""> Loading Menu... </p>
        )}
      </div>
      <div className="flex items-center justify-center">
        <button className="btn btn-outline border-0 border-b-4 mt-4"> View Full Menu </button>
      </div>
      
    </section>
  );
};

export default PolpularMenu;