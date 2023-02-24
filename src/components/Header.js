import logoAirbnb from "../img/logo-airbnb.svg";
import iconSearch from "../img/icon-search.svg";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between border-b-[1px] border-slate-200 h-20 w-full py-3 px-5">
        <div className="">
          <img className="h-12" src={logoAirbnb} alt="logo Airbnb" />
        </div>
        <div
          className="flex items-center justify-between menu border-[1px] border-slate-2
      00 rounded-full w-20 h-10 pr-2 pl-3"
        >
          <div className="burger">
            <div className="w-4 border-t-2 border-slate-400 mb-[2px]"></div>
            <div className="w-4 border-t-2 border-slate-400 mb-[2px]"></div>
            <div className="w-4 border-t-2 border-slate-400"></div>
          </div>
          <div className="avatar w-7 h-7 rounded-full bg-slate-400"></div>
        </div>
      </div>
      <div className="search-bar my-5 mx-5 text-slate-700 bg-neutral-50 drop-shadow-lg rounded-full">
        <div className="flex items-center justify-between rounded-full h-14 w-full border-slate-200 border-[1px] pl-5 pr-3 text-sm">
          <div className="where">Destination</div>
          <div className="sep w-[1px] h-8 bg-slate-200"></div>
          <div className="when">Quand ?</div>
          <div className="sep w-[1px] h-8 bg-slate-200"></div>
          <div className="who">Voyageurs</div>
          <div className="icon-search w-8 h-8 rounded-full bg-red-500">
            <img src={iconSearch} alt="Icon search" className="p-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
