import React from "react";
import { useState, useEffect } from "react";

// import packages
import { Link, Navigate, useNavigate } from "react-router-dom";
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
          `http://localhost:3000/user/${userId}/favorites`,
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
  }, [userId, userToken]);

  const handleRemoveFromFavorites = async (roomId) => {
    try {
      await axios.delete(
        `http://localhost:3000/rooms/favorites/delete/${roomId}`,
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
      <div className="fixed bg-white w-full top-0">
        <Header
          userToken={userToken}
          userInfos={userInfos}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-48 sm:mt-36">
        <h1 className="text-3xl font-bold mx-10">Favorites</h1>
        {favorites.map((room) => {
          return (
            <>
              <div className="mx-10 mt-5 shadow-xl rounded-lg border-[1px] p-6 relative">
                <XCircleIcon
                  onClick={() => {
                    handleRemoveFromFavorites(room._id);
                  }}
                  className="h-8 w-8 absolute m-3 right-6 text-white cursor-pointer transition duration-300 hover:text-red-500"
                />
                <img
                  src={room.picture.secure_url}
                  alt={room.title}
                  className="rounded-lg object-cover"
                />
                <p className="mt-5 truncate">{room.title}</p>
                <div className="flex justify-between mt-3">
                  <p>
                    {room.city}, {room.country}
                  </p>
                  <p>
                    € <span className="font-bold">{room.price} </span>per night
                  </p>
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
