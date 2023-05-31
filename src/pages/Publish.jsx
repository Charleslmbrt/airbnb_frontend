import { useState } from "react";

// import packages
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

// imports assets
import logoAirbnb from "../img/logo-airbnb.svg";

// imports components
import Started from "../components/publish/Started";
import Intro from "../components/publish/Intro";
import Types from "../components/publish/Types";
import Location from "../components/publish/Location";
import Basics from "../components/publish/Basics";
import Options from "../components/publish/Options";
import Pictures from "../components/publish/Pictures";
import Description from "../components/publish/Description";
import Price from "../components/publish/Price";
import Submit from "../components/publish/Submit";
import ProgressBar from "../components/publish/ProgressBar";

const Publish = ({ userToken }) => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [guests, setGuests] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [options, setOptions] = useState("");
  const [pictures, setPictures] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(90);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("guests", guests);
    formData.append("bedrooms", bedrooms);
    formData.append("beds", beds);
    formData.append("bathrooms", bathrooms);
    for (let i = 0; i < pictures.length; i++) {
      formData.append("pictures", pictures[i]);
    }
    formData.append("location_lat", location.lat);
    formData.append("location_lng", location.lng);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("options", options);
    formData.append("address", address);

    try {
      const response = await axios.post(
        "https://airbnb-cl.herokuapp.com/room/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const steps = [
    {
      title: "Started",
      content: <Started />,
      display: false,
    },
    {
      title: "Intro",
      content: <Intro />,
      display: true,
    },
    {
      title: "Types",
      content: <Types type={type} setType={setType} />,
      display: true,
    },
    {
      title: "Location",
      content: (
        <Location
          address={address}
          setAddress={setAddress}
          location={location}
          setLocation={setLocation}
          city={city}
          setCity={setCity}
          country={country}
          setCountry={setCountry}
        />
      ),
      display: true,
    },
    {
      title: "Basics",
      content: (
        <Basics
          guests={guests}
          setGuests={setGuests}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          beds={beds}
          setBeds={setBeds}
          bathrooms={bathrooms}
          setBathrooms={setBathrooms}
        />
      ),
      display: true,
    },
    {
      title: "Options",
      content: <Options options={options} setOptions={setOptions} />,
      display: true,
    },
    {
      title: "Pictures",
      content: (
        <Pictures
          preview={preview}
          setPreview={setPreview}
          pictures={pictures}
          setPictures={setPictures}
        />
      ),
      display: true,
    },
    {
      title: "Description",
      content: (
        <Description
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
      ),
      display: true,
    },
    {
      title: "Price",
      content: <Price price={price} setPrice={setPrice} />,
      display: true,
    },
    {
      title: "Submit",
      content: (
        <Submit
          handleSubmit={handleSubmit}
          title={title}
          price={price}
          pictures={pictures}
          address={address}
          guests={guests}
          beds={beds}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          options={options}
          description={description}
        />
      ),
      display: true,
    },
  ];

  const goToNextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  return userToken ? (
    <>
      <div className="flex flex-col justify-between h-screen">
        <div className="flex justify-center p-5">
          <Link to="/">
            <img src={logoAirbnb} alt="Logo Airbnb" className="h-16" />
          </Link>
        </div>

        <div className="text-lg">{steps[currentSlide].content}</div>

        {steps[currentSlide].display === false ? (
          <div className="h-auto">
            <div className="fixed bottom-0 w-full px-10 py-5 lg:flex lg:justify-end">
              <div
                className="p-3 bg-red-500 rounded-lg text-white text-sm text-center cursor-pointer lg:w-40"
                onClick={goToNextSlide}
                disabled={currentSlide === steps.length - 1}
              >
                Get started
              </div>
            </div>
          </div>
        ) : (
          <div className="h-1/6">
            <div className="fixed bottom-0 w-full border-t-2 bg-white  py-5 ">
              <div className="fixed bottom-0 mb-[85px] w-full">
                <ProgressBar steps={steps} currentSlide={currentSlide} />
              </div>
              <div className="buttons flex justify-between sm:content-between px-10">
                <div
                  className="px-8 py-3  bg-gray-900 rounded-lg text-white text-sm text-center cursor-pointer"
                  onClick={goToPrevSlide}
                  // disabled={currentSlide === 0}
                >
                  Back
                </div>
                <div
                  className={`px-8 py-3 ${
                    currentSlide === steps.length - 1
                      ? " bg-gray-200 rounded-lg text-gray-700 text-sm text-center cursor-not-allowed"
                      : "bg-gray-900 rounded-lg text-white text-sm text-center cursor-pointer"
                  }`}
                  onClick={goToNextSlide}
                  disabled={currentSlide === steps.length - 1}
                >
                  Next
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <Navigate to="/user/login" />
  );
};

export default Publish;
