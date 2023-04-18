import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// imports package
import axios from "axios";
import { Carousel } from "antd";

// imports components
import Header from "../components/Header";
// import Filters from "../components/Filters";

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
  }, [setIsLoading, id]);

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
        {/* <Filters /> */}
      </div>
      <div className="mt-44">
        <Carousel afterChange={onChange}>
          {roomData?.picturesArray?.map((picture) => {
            return (
              <img
                key={picture.asset_id}
                src={picture.secure_url}
                alt=""
                className="object-cover max-h-80"
              />
            );
          })}
        </Carousel>
        <div className="mx-10 mt-5">
          <p className="text-2xl font-medium">{roomData?.title}</p>
          <p className="text-lg mt-1">
            {roomData?.city}, {roomData?.country}
          </p>

          <p className="text-sm  text-gray-400">{roomData?.type}</p>
          <div className="w-full my-5 h-px bg-gray-200"></div>
          <div className="flex justify-between items-center">
            <p className="text-2xl">Hosted by {userInfos?.firstname}</p>
            <img
              src={userInfos?.picture?.secure_url}
              alt=""
              className="w-12 h-12 rounded-full bg-red-500 object-cover"
            />
          </div>
          <p className="font-light">
            {roomData?.mainInfos.guests} guests • {roomData?.mainInfos.bedrooms}{" "}
            bedrooms • {roomData?.mainInfos.beds} beds •
            {roomData?.mainInfos.bathrooms} bathrooms
          </p>
          <div className="w-full my-5 h-px bg-gray-200"></div>
          <p className="">{roomData?.description}</p>
          <div className="w-full my-5 h-px bg-gray-200"></div>
          <p className="text-xl font-medium">What this place offers</p>
          <p className="mt-2">{roomData?.options}</p>
          <div className="w-full my-5 h-px bg-gray-200"></div>
          <p className="text-xl font-medium">Where you'll be</p>
          <div className="bg-red-600 mb-[600px] w-full h-[500px]"></div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
