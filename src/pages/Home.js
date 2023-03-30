import { useEffect, useState } from "react";
import axios from "axios";

// imports components
import Header from "../components/Header";
import Filters from "../components/Filters";

//import img
import iconStar from "../img/star.png";

const Home = ({ handleToken, userToken }) => {
  const [roomsData, setRoomsData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rooms");
        setRoomsData(response.data.result);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="fixed bg-white w-full top-0">
        <Header handleToken={handleToken} userToken={userToken} />
        <Filters />
      </div>

      {isLoading === true ? (
        <h1>Loading....</h1>
      ) : (
        <div className="grid-thumbnails m-10 grid gap-5  mt-48 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {roomsData.map((room) => {
            return (
              <div className="thumbnail" key={room._id}>
                <img
                  src={room.picture.secure_url}
                  alt=""
                  className="h-96 bg-slate-700 rounded-[15px] sm:h-72 object-cover"
                />
                <div className="description flex justify-between items-start mt-3 ">
                  <div className="description-text text-sm grow">
                    <p className="font-medium">
                      {room.city}, {room.country}
                    </p>
                    <p className="text-gray-500">{room.type}</p>
                    <p>
                      € <span className="font-medium">{room.price} </span>night
                    </p>
                  </div>

                  <div className="description-review flex items-center justify-end w-2/12 ">
                    <img
                      src={iconStar}
                      alt="icon star"
                      className="w-4 h-4 mr-1"
                    />
                    <p className="text-sm">4,95</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
