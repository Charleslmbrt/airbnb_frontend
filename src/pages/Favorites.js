import React from "react";
import { useState, useEffect } from "react";

// import packages
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
          return <p className="">{room.title}</p>;
        })}
      </div>
    </>
  ) : (
    <Navigate to="/user/login" />
  );
};

export default Favorites;
