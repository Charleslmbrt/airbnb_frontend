import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// imports package
import axios from "axios";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { Space } from "antd";

// imports components
import Header from "../components/Header";
import Filters from "../components/Filters";

//import img
import iconStar from "../img/star.png";

const Home = ({
  handleConnect,
  userToken,
  userInfos,
  userId,
  isLoading,
  setIsLoading,
  addToFavorites,
  handleRemoveFromFavorites,
  favorites,
  contextHolder,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}) => {
  const [roomsData, setRoomsData] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [displayRooms, setDisplayRooms] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://airbnb-cl.herokuapp.com/rooms`;
        if (typeFilter !== "AllHomes") {
          url += `?type=${typeFilter}`;
        }
        if (priceMin && displayRooms) {
          url += `&priceMin=${priceMin}`;
        }
        if (priceMax && displayRooms) {
          url += `&priceMax=${priceMax}`;
        }
        const response = await axios.get(url);
        setRoomsData(response.data.rooms);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [typeFilter, priceMin, priceMax, displayRooms]);

  return (
    <>
      <div className="fixed bg-white w-full top-0 z-10">
        <Header
          handleConnect={handleConnect}
          userToken={userToken}
          userInfos={userInfos}
          isLoading={isLoading}
          userId={userId}
        />
        <Filters
          setTypeFilter={setTypeFilter}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          displayRooms={displayRooms}
          setDisplayRooms={setDisplayRooms}
        />
      </div>

      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <div className="flex justify-center mt-5">
            <div className="grid-thumbnails max-w-8xl mx-10 grid gap-5 mt-72 sm:mt-36 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 relative xl:mx-20">
              {roomsData?.map((room) => {
                const isFavorite = favorites.find(
                  (favRoom) => favRoom._id === room._id
                );

                const HeartComponent = isFavorite
                  ? HeartIcon
                  : HeartIconOutline;

                const handleHeartClick = () => {
                  if (isFavorite) {
                    handleRemoveFromFavorites(room._id);
                  } else {
                    addToFavorites(room._id);
                  }
                };

                return (
                  <div className="relative" key={room._id}>
                    {contextHolder}
                    <Space>
                      <HeartComponent
                        onClick={() => {
                          handleHeartClick();
                        }}
                        className={`h-6 w-6 absolute m-3 right-0 ${
                          isFavorite ? "text-red-500" : "text-white"
                        } cursor-pointer transition duration-300 hover:text-red-500`}
                      />
                    </Space>
                    <Link to={`/rooms/${room._id}`}>
                      <div className="thumbnail">
                        <img
                          src={room.picture.secure_url}
                          alt=""
                          className="w-96 h-96 bg-slate-700 rounded-[15px] sm:h-72 object-cover"
                        />
                        <div className="description flex justify-between items-start mt-3 ">
                          <div className="description-text text-sm grow">
                            <p className="font-medium">
                              {room.city}, {room.country}
                            </p>
                            <p className="text-gray-500">{room.type}</p>
                            <p>
                              €{" "}
                              <span className="font-medium">{room.price} </span>
                              night
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
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
