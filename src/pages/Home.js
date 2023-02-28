// imports components
import Header from "../components/Header";
import Filters from "../components/Filters";

//import img
import iconStar from "../img/star.png";

const Home = ({ handleToken, userToken }) => {
  return (
    <>
      <Header handleToken={handleToken} userToken={userToken} />
      <Filters />

      <div className="grid-thumbnails m-5 grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <div className="thumbnail">
          <img
            src=""
            alt=""
            className="h-96 bg-slate-700 rounded-[15px] sm:h-72"
          />
          <div className="description flex justify-between items-start mt-3">
            <div className="description-text text-sm">
              <p className="font-bold">Macheren, France</p>
              <p>316 € par nuit</p>
            </div>
            <div className="description-review flex items-center">
              <img src={iconStar} alt="icon star" className="w-4 h-4 mr-1" />
              <p className="text-sm">4,95</p>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <img
            src=""
            alt=""
            className="h-96 bg-slate-700 rounded-[15px] sm:h-72"
          />
          <div className="description flex justify-between items-start mt-3">
            <div className="description-text text-sm">
              <p className="font-bold">Macheren, France</p>
              <p>316 € par nuit</p>
            </div>
            <div className="description-review flex items-center">
              <img src={iconStar} alt="icon star" className="w-4 h-4 mr-1" />
              <p className="text-sm">4,95</p>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <img
            src=""
            alt=""
            className="h-96 bg-slate-700 rounded-[15px] sm:h-72"
          />
          <div className="description flex justify-between items-start mt-3">
            <div className="description-text text-sm">
              <p className="font-bold">Macheren, France</p>
              <p>316 € par nuit</p>
            </div>
            <div className="description-review flex items-center">
              <img src={iconStar} alt="icon star" className="w-4 h-4 mr-1" />
              <p className="text-sm">4,95</p>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <img
            src=""
            alt=""
            className="h-96 bg-slate-700 rounded-[15px] sm:h-72"
          />
          <div className="description flex justify-between items-start mt-3">
            <div className="description-text text-sm">
              <p className="font-bold">Macheren, France</p>
              <p>316 € par nuit</p>
            </div>
            <div className="description-review flex items-center">
              <img src={iconStar} alt="icon star" className="w-4 h-4 mr-1" />
              <p className="text-sm">4,95</p>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <img
            src=""
            alt=""
            className="h-96 bg-slate-700 rounded-[15px] sm:h-72"
          />
          <div className="description flex justify-between items-start mt-3">
            <div className="description-text text-sm">
              <p className="font-bold">Macheren, France</p>
              <p>316 € par nuit</p>
            </div>
            <div className="description-review flex items-center">
              <img src={iconStar} alt="icon star" className="w-4 h-4 mr-1" />
              <p className="text-sm">4,95</p>
            </div>
          </div>
        </div>
        <div className="thumbnail">
          <img
            src=""
            alt=""
            className="h-96 bg-slate-700 rounded-[15px] sm:h-72"
          />
          <div className="description flex justify-between items-start mt-3">
            <div className="description-text text-sm">
              <p className="font-bold">Macheren, France</p>
              <p>316 € par nuit</p>
            </div>
            <div className="description-review flex items-center">
              <img src={iconStar} alt="icon star" className="w-4 h-4 mr-1" />
              <p className="text-sm">4,95</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
