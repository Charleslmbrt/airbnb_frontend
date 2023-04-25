import iconSearch from "../img/icon-search.svg";

const SearchBar = () => {
  return (
    <>
      <div className="search-bar my-5 mx-10 text-slate-700 bg-neutral-50 drop-shadow-sm rounded-full ">
        <div className="flex items-center justify-between rounded-full h-12 w-full border-slate-200 border-[1px] pl-5 pr-3 text-sm">
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

export default SearchBar;
