import { useState } from "react";

// import packages
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

// imports assets
import logoAirbnb from "../img/logo-airbnb.svg";

// imports components
import IntroPublish from "../components/publish/IntroPublish";
import TypesPublish from "../components/publish/TypesPublish";
import LocationPublish from "../components/publish/LocationPublish";
import BasicsPublish from "../components/publish/BasicsPublish";
import OptionsPublish from "../components/publish/OptionsPublish";
import PicturesPublish from "../components/publish/PicturesPublish";
import DescriptionPublish from "../components/publish/DescriptionPublish";
import PricePublish from "../components/publish/PricePublish";

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

  const steps = [
    {
      title: "Intro",
      content: <IntroPublish />,
    },
    {
      title: "Types",
      content: <TypesPublish type={type} setType={setType} />,
    },
    {
      title: "Location",
      content: (
        <LocationPublish
          address={address}
          setAddress={setAddress}
          setLocation={setLocation}
          setCity={setCity}
          setCountry={setCountry}
        />
      ),
    },
    {
      title: "Basics",
      content: (
        <BasicsPublish
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
    },
    {
      title: "Options",
      content: <OptionsPublish options={options} setOptions={setOptions} />,
    },
    {
      title: "Pictures",
      content: (
        <PicturesPublish
          preview={preview}
          setPreview={setPreview}
          pictures={pictures}
          setPictures={setPictures}
        />
      ),
    },
    {
      title: "Description",
      content: (
        <DescriptionPublish
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
      ),
    },
    {
      title: "Price",
      content: <PricePublish price={price} setPrice={setPrice} />,
    },
  ];

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

  return userToken ? (
    <>
      <div className="flex justify-center mt-5">
        <Link to="/">
          <img src={logoAirbnb} alt="Logo Airbnb" className="h-16" />
        </Link>
      </div>

      <BasicsPublish
        guests={guests}
        setGuests={setGuests}
        bedrooms={bedrooms}
        setBedrooms={setBedrooms}
        beds={beds}
        setBeds={setBeds}
        bathrooms={bathrooms}
        setBathrooms={setBathrooms}
      />

      <div className="right mx-5 flex flex-col mb-[50px]">
        <button
          className="mt-16 w-full  rounded-xl p-5 bg-red-400 text-white sm:max-w-[450px]"
          onClick={handleSubmit}
        >
          Publish my Airbnb
        </button>
      </div>
    </>
  ) : (
    <Navigate to="/user/login" />
  );
};

export default Publish;

// import { useState } from "react";

// function Slides() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const steps = [
//     {
//       title: "Première étape",
//       content: "Contenu de la première étape",
//     },
//     {
//       title: "Deuxième étape",
//       content: "Contenu de la deuxième étape",
//     },
//     {
//       title: "Troisième étape",
//       content: "Contenu de la troisième étape",
//     },
//   ];

//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => prev + 1);
//   };

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => prev - 1);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl font-bold mb-4">
//         Étape {currentSlide + 1} : {steps[currentSlide].title}
//       </h1>
//       <p className="text-lg mb-8">{steps[currentSlide].content}</p>
//       <div className="flex">
//         <button
//           className={`px-4 py-2 mr-4 ${
//             currentSlide === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//           onClick={goToPrevSlide}
//           disabled={currentSlide === 0}
//         >
//           Précédent
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             currentSlide === steps.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//           onClick={goToNextSlide}
//           disabled={currentSlide === steps.length - 1}
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   );
// }
