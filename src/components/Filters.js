import iconPool from "../img/icon-piscine.png";
import iconSea from "../img/icon-mer.png";
import iconView from "../img/icon-vue.png";
import iconLuxe from "../img/icon-luxe.png";
import iconCamping from "../img/icon-camping.png";

const Filters = () => {
  return (
    <>
      <div className="filters ">
        <div className="categories flex justify-between mx-5 text-xs opacity-60 mt-5">
          <div className="pool flex flex-col items-center">
            <img src={iconPool} alt="icon pool" className="w-6 mb-1 " />
            <p>Piscines</p>
          </div>
          <div className="sea flex flex-col items-center ml-4">
            <img src={iconSea} alt="icon pool" className="w-6 mb-1 " />
            <p>Bord de mer</p>
          </div>
          <div className="view flex flex-col items-center ml-4">
            <img src={iconView} alt="icon pool" className="w-6 mb-1 " />
            <p>Avec vue</p>
          </div>
          <div className="luxe flex flex-col items-center ml-4">
            <img src={iconLuxe} alt="icon pool" className="w-6 mb-1 " />
            <p>Luxe</p>
          </div>
          <div className="view flex flex-col items-center ml-4">
            <img src={iconCamping} alt="icon pool" className="w-6 mb-1 " />
            <p>Camping</p>
          </div>
        </div>
        <div className="sep w-full h-[1px] bg-slate-200 mt-3"></div>
      </div>
    </>
  );
};

export default Filters;
