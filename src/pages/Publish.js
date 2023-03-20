import { useState } from "react";

// import packages
import { Link, Navigate } from "react-router-dom";
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

const Publish = ({ userToken }) => {
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
    formData.append("location", location);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("options", options);
    formData.append("address", address);

    try {
      const response = await axios.post(
        "http://localhost:3000/room/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
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
          setLocation={setLocation}
          setCity={setCity}
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
      content: <Submit handleSubmit={handleSubmit} />,
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
      <div className="flex flex-col items-center justify-between h-screen">
        <div className="flex justify-center mt-5">
          <Link to="/">
            <img src={logoAirbnb} alt="Logo Airbnb" className="h-16" />
          </Link>
        </div>

        {/* <h1 className="text-4xl font-bold mb-4">
          Étape {currentSlide + 1} : {steps[currentSlide].title}
        </h1> */}
        <p className="text-lg mb-8">{steps[currentSlide].content}</p>

        {steps[currentSlide].display === false ? (
          <button
            className={`px-4 py-2 ${
              currentSlide === steps.length - 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={goToNextSlide}
            disabled={currentSlide === steps.length - 1}
          >
            Get started
          </button>
        ) : (
          <div className="flex">
            <button
              className={`px-4 py-2 mr-4 ${
                currentSlide === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={goToPrevSlide}
              disabled={currentSlide === 0}
            >
              Précédent
            </button>
            <button
              className={`px-4 py-2 ${
                currentSlide === steps.length - 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={goToNextSlide}
              disabled={currentSlide === steps.length - 1}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </>
  ) : (
    <Navigate to="/user/login" />
  );
};

export default Publish;
