import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// imports package
import axios from "axios";
import { Carousel } from "antd";

// imports components
import Header from "../components/Header";
import Filters from "../components/Filters";

const Rooms = ({
  userToken,
  userInfos,
  isLoading,
  setIsLoading,
  handleConnect,
  userId,
}) => {
  const { id } = useParams();
  const [roomData, setRoomData] = useState();

  useEffect(() => {
    const fetchDataRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/rooms/${id}`);
        setRoomData(response.data.result);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataRoom();
  }, [setIsLoading]);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return isLoading ? (
    <>
      <p>Loading...</p>
    </>
  ) : (
    <>
      <div className="fixed bg-white w-full top-0 z-10">
        <Header
          handleConnect={handleConnect}
          userToken={userToken}
          userInfos={userInfos}
          isLoading={isLoading}
          userId={userId}
        />
        <Filters />
      </div>
      <div className="mt-56">
        <Carousel afterChange={onChange}>
          {roomData?.picturesArray?.map((picture) => {
            return (
              <img
                src={picture.secure_url}
                alt=""
                className="object-cover max-h-80"
              />
            );
          })}
        </Carousel>

        <p className="text-xl">{roomData?.title}</p>
      </div>
    </>
  );
};

export default Rooms;
