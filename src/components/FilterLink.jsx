import React from "react";

const FilterLink = ({ label, icon, filterName, activeLink, handleFilter }) => {
  const isActive = activeLink === filterName;
  const opacity = isActive ? "opacity-100" : "opacity-60";
  const border = isActive ? "pb-1 border-b-2 border-black" : "border-none";

  return (
    <div
      className={`flex flex-col items-center cursor-pointer ${border} ${opacity}`}
      onClick={() => handleFilter(filterName)}
    >
      <img src={icon} alt={`icon ${label}`} className="w-6 mb-1 " />
      <p>{label}</p>
    </div>
  );
};

export default FilterLink;
