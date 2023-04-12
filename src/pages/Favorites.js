import React from "react";
import { useState, useEffect } from "react";

// import packages
import { Navigate } from "react-router-dom";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/24/outline";

// imports components
import Header from "../components/Header";

const Favorites = ({
  userToken,
  userInfos,
  userId,
  isLoading,
  setIsLoading,
}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${userId}/favorites`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFavorites(response.data.result);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFavoritesData();
  }, [userId, userToken, setIsLoading]);

  const handleRemoveFromFavorites = async (roomId) => {
    try {
      await axios.delete(
        `http://localhost:8080/rooms/favorites/delete/${roomId}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setFavorites(favorites.filter((room) => room._id !== roomId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return userToken ? (
    <>
      <div className="fixed bg-white w-full top-0 z-10">
        <Header
          userToken={userToken}
          userInfos={userInfos}
          isLoading={isLoading}
        />
      </div>

      <h1 className="text-3xl font-bold mx-10 mt-48 sm:mt-36">Favorites</h1>
      <div className="grid-thumbnails m-10 grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        {favorites.map((room) => {
          return (
            <>
              <div className="shadow-xl rounded-lg border-[1px] p-6 max-w-[425px] relative">
                <XCircleIcon
                  onClick={() => {
                    handleRemoveFromFavorites(room._id);
                  }}
                  className="h-8 w-8 absolute m-3 right-6 text-white cursor-pointer transition duration-300 hover:text-red-500"
                />
                <img
                  src={room.picture.secure_url}
                  alt={room.title}
                  className="rounded-lg object-cover min-h-[200px]"
                />
                <p className="mt-5 truncate">{room.title}</p>
                <div className="flex justify-between mt-3">
                  <p>
                    {room.city}, {room.country}
                  </p>
                  {/* <p>
                    € <span className="font-bold">{room.price} </span>per night
                  </p> */}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  ) : (
    <Navigate to="/user/login" />
  );
};

export default Favorites;
