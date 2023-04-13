import "./App.css";
import { useState, useEffect } from "react";

// import Packages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

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
    }
  };

  useEffect(() => {
    const userInfosData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUserInfos(response.data.result);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    userInfosData();
  }, [userId, userToken]);

  console.log("userInfos", userInfos);

  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
