import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// imports package
import axios from "axios";
import { HeartIcon } from "@heroicons/react/24/solid";
import { notification, Space } from "antd";

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
}) => {
  const [roomsData, setRoomsData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:8080/rooms`;
        if (typeFilter !== "AllHomes") {
          url += `?type=${typeFilter}`;
        }
        const response = await axios.get(url);
        setRoomsData(response.data.rooms);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [typeFilter, setIsLoading]);

  const addToFavorites = async (roomId) => {
    try {
      await axios.post(
        `http://localhost:8080/rooms/favorites/${roomId}`,
        null,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      const updatedFavorites = await axios.get(
        `http://localhost:8080/user/${userId}/favorites`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setFavorites(updatedFavorites.data);

      const isAlreadyFavorite = favorites.find((room) => room._id === roomId);

      if (!isAlreadyFavorite) {
        openNotificationWithIcon(
          "success",
          "You have added the room to your favorites."
        );
      }
    } catch (error) {
      if (error.response.data === "Unauthorized") {
        openNotificationWithIcon("error", "You need to be connected");
      } else if (error.response.data === "Room already in favorites") {
        openNotificationWithIcon("warning", "Room already in favorites.");
      }
      console.log(error.response.data);
    }
  };

  // Notification Favorites
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      // message: "Notification Title",
      description: message,
      duration: 2,
      // className: "bg-green-600",
    });
  };

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
        <Filters setTypeFilter={setTypeFilter} />
      </div>

      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <div className="flex justify-center mt-5">
            <div className="grid-thumbnails max-w-8xl mx-10 grid gap-5 mt-60 sm:mt-36 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 relative xl:mx-20">
              {roomsData?.map((room) => {
                return (
                  <div className="relative" key={room._id}>
                    {contextHolder}
                    <Space>
                      <HeartIcon
                        onClick={() => {
                          addToFavorites(room._id);
                        }}
                        className="h-6 w-6 absolute m-3 right-0 text-white cursor-pointer transition duration-300 hover:text-red-500"
                      />
                    </Space>
                    <Link to={`/rooms/${room._id}`}>
                      <div className="thumbnail">
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
