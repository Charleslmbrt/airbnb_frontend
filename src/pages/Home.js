// imports components
import Header from "../components/Header";
import Filters from "../components/Filters";

//import img
import iconStar from "../img/star.png";

const Home = () => {
  return (
    <div>
      <Header />
      <Filters />

      <div className="thumbnail">
        <img src="" alt="" className="h-96 bg-slate-700 rounded-[15px] m-5" />
        <div className="description">
          <div className="description-text">
            <p>Macheren, France</p>
            <p>316 € par nuit</p>
          </div>
          <div className="description-review">
            <img src={iconStar} alt="icon star" />
            <p>4,95</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
