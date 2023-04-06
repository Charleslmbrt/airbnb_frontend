import React from "react";

// imports components
import Header from "../components/Header";

const Favorites = ({ handleConnect, userToken, userInfos, isLoading }) => {
  return (
    <>
      <div className="fixed bg-white w-full top-0">
        <Header
          handleConnect={handleConnect}
          userToken={userToken}
          userInfos={userInfos}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Favorites;
