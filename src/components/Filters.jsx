import { useState } from "react";

// import packages
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";

// import assets
import iconPool from "../img/icon-piscine.png";
import iconDesign from "../img/icon-design.png";
import iconLuxe from "../img/icon-luxe.png";
import iconCamping from "../img/icon-camping.png";
import iconHistorical from "../img/icon-historica-home.png";
import iconOMG from "../img/icon-omg.png";
import iconAllHomes from "../img/icon-trending.png";

//import components
import PriceRange from "./PriceRange";

const Filters = ({
  setTypeFilter,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  displayRooms,
  setDisplayRooms,
  setFilterApplied,
}) => {
  const [activeLink, setActiveLink] = useState("AllHomes");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilter = (filter) => {
    setTypeFilter(filter);
    setActiveLink(filter);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    // setDisplayRooms(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="max-w-8xl mx-auto">
        <div className="categories flex flex-col justify-between mx-10 text-xs  mt-5  xl:mx-20 sm:flex-row">
          <div className="filtersCatContainer flex justify-between w-full mr-20">
            <div
              className={`flex flex-col items-center cursor-pointer  ${
                activeLink === "AllHomes"
                  ? "pb-4 border-b-2 border-black opacity-100"
                  : "border-none opacity-60"
              }`}
              onClick={() => {
                handleFilter("AllHomes");
              }}
            >
              <img src={iconAllHomes} alt="icon pool" className="w-6 mb-1 " />
              <p>All Homes</p>
            </div>

            <div
              className={`flex flex-col items-center cursor-pointer  ${
                activeLink === "Amazing Pool"
                  ? "pb-4 border-b-2 border-black opacity-100"
                  : "border-none opacity-60"
              }`}
              onClick={() => {
                handleFilter("Amazing Pool");
              }}
            >
              <img src={iconPool} alt="icon pool" className="w-6 mb-1 " />
              <p>Pool</p>
            </div>

            <div
              className={`flex flex-col items-center cursor-pointer  ${
                activeLink === "Design"
                  ? "pb-4 border-b-2 border-black opacity-100"
                  : "border-none opacity-60"
              }`}
              onClick={() => handleFilter("Design")}
            >
              <img src={iconDesign} alt="icon design" className="w-6 mb-1" />
              <p>Design</p>
            </div>

            <div
              className={`flex flex-col items-center cursor-pointer  ${
                activeLink === "OMG!"
                  ? "pb-4 border-b-2 border-black opacity-100"
                  : "border-none opacity-60"
              }`}
              onClick={() => handleFilter("OMG!")}
            >
              <img src={iconOMG} alt="icon OMG" className="w-6 mb-1 " />
              <p>OMG!</p>
            </div>

            <div
              className={`flex flex-col items-center cursor-pointer  ${
                activeLink === "Historical homes"
                  ? "pb-4 border-b-2 border-black opacity-100"
                  : "border-none opacity-60"
              }`}
              onClick={() => handleFilter("Historical homes")}
            >
              <img
                src={iconHistorical}
                alt="icon historical"
                className="w-6 mb-1 "
              />
              <p>Historical</p>
            </div>

            <div
              className={`flex flex-col items-center cursor-pointer  ${
                activeLink === "Luxe"
                  ? "pb-4 border-b-2 border-black opacity-100"
                  : "border-none opacity-60"
              }`}
              onClick={() => handleFilter("Luxe")}
            >
              <img src={iconLuxe} alt="icon luxe" className="w-6 mb-1 " />
              <p>Luxe</p>
            </div>
            <div
              className={`flex flex-col items-center cursor-pointer  ${
                activeLink === "Camping"
                  ? "pb-4 border-b-2 border-black opacity-100"
                  : "border-none opacity-60"
              }`}
              onClick={() => handleFilter("Camping")}
            >
              <img src={iconCamping} alt="icon camping" className="w-6 mb-1 " />
              <p>Camping</p>
            </div>
          </div>

          <div
            className="flex justify-between items-center border p-3 rounded-lg mb-5 cursor-pointer mt-5 sm:mt-0"
            type="primary"
            onClick={showModal}
          >
            <AdjustmentsVerticalIcon className="h-5 w-5" />
            <p> Filters</p>
          </div>
          <Modal
            title="Filters"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            className="text-center"
          >
            <PriceRange
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              setDisplayRooms={setDisplayRooms}
              handleCancel={handleCancel}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Filters;
