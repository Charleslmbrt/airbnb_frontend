import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// imports package
import axios from "axios";
import { Carousel } from "antd";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import generatePicker from "antd/es/date-picker/generatePicker";
import momentGenerateConfig from "rc-picker/lib/generate/moment";
import moment from "moment";
import "moment/locale/fr";

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
  const mapContainer = useRef(null);

  moment.locale("fr");
  const MomentPicker = generatePicker(momentGenerateConfig);
  const [selectedDates, setSelectedDates] = useState([]);
  const [numberOfNights, setNumberOfNights] = useState(0);

  const onCalendarChange = (dates) => {
    setSelectedDates(dates);

    // Calculer le nombre de nuits entre les deux dates sélectionnées
    const nights = dates[1].diff(dates[0], "days");
    setNumberOfNights(nights);
  };

  useEffect(() => {
    const fetchDataRoom = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-backend-cl.herokuapp.com/rooms/${id}`
        );
        setRoomData(response.data);
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

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    if (roomData) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [roomData.location[0].lng, roomData.location[0].lat],
        zoom: 12,
      });

      new mapboxgl.Marker()
        .setLngLat([roomData.location[0].lng, roomData.location[0].lat])
        .addTo(map);
    }
    console.log("roomData", roomData);
  }, [roomData]);

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

      <div className="max-w-8xl mx-10 sm:mx-20">
        <div className="mt-44">
          <div className="grid grid-rows-2 grid-cols-4 gap-2">
            <img
              src={roomData?.picturesArray[0]?.secure_url}
              alt=""
              className="col-span-2 row-span-2 object-cover h-full max-h-[600px] w-full"
            />
            {roomData?.picturesArray?.slice(1).map((picture) => {
              return (
                <img
                  src={picture.secure_url}
                  alt=""
                  className="object-cover h-full max-h-[290px] w-full"
                />
              );
            })}
          </div>

          {/* <Carousel afterChange={onChange} className="sm:hidden">
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
          </Carousel> */}
          <div className=" mt-5">
            <p className="text-2xl font-medium">{roomData?.title}</p>
            <p className="text-lg mt-1">
              {roomData?.city}, {roomData?.country}
            </p>

            <p className="text-sm  text-gray-400">{roomData?.type}</p>
            <div className="w-full my-5 h-px bg-gray-200"></div>
            <div className="flex justify-between items-center">
              <p className="text-2xl">
                Hosted by {roomData?.owner?.account?.firstname}
              </p>
              <img
                src={roomData?.owner?.account?.picture?.secure_url}
                alt=""
                className="w-12 h-12 rounded-full bg-red-500 object-cover"
              />
            </div>
            <p className="font-light">
              {roomData?.mainInfos.guests} guests •{" "}
              {roomData?.mainInfos.bedrooms} bedrooms •{" "}
              {roomData?.mainInfos.beds} beds •{roomData?.mainInfos.bathrooms}{" "}
              bathrooms
            </p>
            <div className="w-full my-5 h-px bg-gray-200"></div>
            <p className="">{roomData?.description}</p>
            <div className="w-full my-5 h-px bg-gray-200"></div>
            <p className="text-xl font-medium">What this place offers</p>
            <p className="mt-2">{roomData?.options}</p>
            <div className="w-full my-5 h-px bg-gray-200"></div>
            <p className="text-xl font-medium">Where you'll be</p>
            <div className="mb-8">
              <div ref={mapContainer} className="h-[400px] my-2" />
            </div>
            <div className="w-full my-5 h-px bg-gray-200"></div>
            <div>
              <p className="text-xl font-medium">
                {numberOfNights} nights in {roomData?.city}, {roomData?.country}
              </p>
              <p className="text-sm  text-gray-400 mb-3">
                {selectedDates[0]?.format("MMM DD, YYYY")} -{" "}
                {selectedDates[1]?.format("MMM DD, YYYY")}
              </p>
              <div className="mb-10">
                <MomentPicker.RangePicker
                  value={selectedDates}
                  onChange={onCalendarChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <footer className="h-32 bg-gray-100 border-t-gray-200 border text-sm flex flex-col items-center justify-center mb-20">
        <p>© 2023 Airbnb, Inc.</p>
        <p>Terms • Site map • Privacy • Your Privacy Choices</p>
      </footer> */}

      <div className="border-t-gray-200 border bg-white h-20 z-10 fixed bottom-0 left-0 right-0 flex justify-between px-10 items-center">
        <div className="text">
          {numberOfNights ? (
            <p>
              <span className="font-bold">
                € {roomData?.price * numberOfNights}
              </span>{" "}
              for {numberOfNights} nights
            </p>
          ) : (
            <p>
              <span className="font-bold">€ {roomData?.price}</span> night
            </p>
          )}
          <p>
            {" "}
            {selectedDates[0]?.format("MMM DD")} -{" "}
            {selectedDates[1]?.format("DD")}
          </p>
        </div>
        <button className="bg-red-500 py-2 px-5 rounded-lg text-white">
          Reserve
        </button>
      </div>
    </>
  );
};

export default Rooms;
