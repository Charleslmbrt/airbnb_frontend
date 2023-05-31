import { useState, useEffect } from "react";

// import Packages
import { Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { notification } from "antd";

// import Components/Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Favorites from "./pages/Favorites";
import Room from "./pages/Room";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [userInfos, setUserInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [priceMin, setPriceMin] = useState(10);
  const [priceMax, setPriceMax] = useState(2000);

  const handleConnect = (token, userId) => {
    if (token && userId) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
      Cookies.set("userId", userId, { expires: 7 });
      setUserId(userId);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
      Cookies.remove("userId");
      setUserId(null);
      window.location.reload(); // To reload the page
    }
  };

  useEffect(() => {
    const userInfosData = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-backend-cl.herokuapp.com/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUserInfos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    userInfosData();
  }, [userId, userToken]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userToken && userId) {
        try {
          const response = await axios.get(
            `https://airbnb-backend-cl.herokuapp.com/user/${userId}/favorites`,
            {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            }
          );
          setFavorites(response.data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchFavorites();
  }, [userToken, userId]);

  console.log("userInfos", userInfos);

  const location = useLocation();
  const match = location.pathname.match(/\/rooms\/(\d+)/);
  const roomId = match ? match[1] : null;

  // ******************  Add and delete room as favorite  ******************

  const addToFavorites = async (roomId) => {
    const isAlreadyFavorite = favorites.find((room) => room._id === roomId);

    if (isAlreadyFavorite) {
      openNotificationWithIcon("warning", "Room already in favorites.");
      return;
    }

    try {
      await axios.post(
        `https://airbnb-backend-cl.herokuapp.com/rooms/favorites/${roomId}`,
        null,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      const updatedFavorites = await axios.get(
        `https://airbnb-backend-cl.herokuapp.com/user/${userId}/favorites`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setFavorites(updatedFavorites.data);

      openNotificationWithIcon(
        "success",
        "You have added the room to your favorites."
      );
    } catch (error) {
      if (error.response.data === "Unauthorized") {
        openNotificationWithIcon("error", "You need to be connected");
      } else {
        console.log(error.response.data);
      }
    }
  };

  const handleRemoveFromFavorites = async (roomId) => {
    try {
      await axios.delete(
        `https://airbnb-backend-cl.herokuapp.com/rooms/favorites/delete/${roomId}`,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      setFavorites(favorites.filter((room) => room._id !== roomId));

      openNotificationWithIcon(
        "success",
        "You have deleted the room to your favorites."
      );
    } catch (error) {
      console.log(error.message);
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
    <div className="App min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleConnect={handleConnect}
              userId={userId}
              userToken={userToken}
              userInfos={userInfos}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              addToFavorites={addToFavorites}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={favorites}
              contextHolder={contextHolder}
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
            />
          }
        />
        <Route
          path="/user/signup"
          element={<Signup handleConnect={handleConnect} />}
        />
        <Route
          path="/user/login"
          element={<Login handleConnect={handleConnect} />}
        />
        <Route
          path="/room/publish"
          element={<Publish userToken={userToken} />}
        />
        <Route
          path="/user/:userId/favorites"
          element={
            <Favorites
              userToken={userToken}
              userInfos={userInfos}
              userId={userId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route
          path="/rooms/:id"
          element={
            <Room
              handleConnect={handleConnect}
              userId={userId}
              userToken={userToken}
              userInfos={userInfos}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
      </Routes>

      <footer
        className={`sticky top-[100vh] h-32 bg-gray-100 border-t-gray-200 border text-sm flex flex-col items-center justify-center mt-20 ${
          roomId ? "mb-20" : ""
        }`}
      >
        <p>© 2023 Airbnb, Inc.</p>
        <p>Terms • Site map • Privacy • Your Privacy Choices</p>
      </footer>
    </div>
  );
}

export default App;
