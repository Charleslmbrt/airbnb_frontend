import "./App.css";
import { useState } from "react";

// import Packages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// import Components/Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [userInfos, setUserInfos] = useState();

  const handleConnect = (token, userId) => {
    if (token && userId) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
      Cookies.set("userID", userId, { expires: 7 });
      setUserId(userId);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
      Cookies.remove("userId");
      setUserId(null);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home handleConnect={handleConnect} userToken={userToken} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
