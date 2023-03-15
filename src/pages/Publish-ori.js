import { useState } from "react";

// import packages
import { Link, Navigate } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

// imports assets
import homeAirbnbVideo from "../img/video_home_airbnb.mp4";
import logoAirbnb from "../img/logo-airbnb.svg";

// imports components
import Counter from "../components/Counter";

const Publish = ({ userToken }) => {
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
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
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

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

  const handleMaxLength = (setValue, maxLength) => (event) => {
    const textAreaValue = event.target.value;
    if (textAreaValue.length <= maxLength) {
      setValue(textAreaValue);
    }
  };

  const handleAddress = async (value) => {
    const addressResult = await geocodeByAddress(value);
    const coordinatesResult = await getLatLng(addressResult[0]);
    setAddress(value);
    setLocation(coordinatesResult);
    const { address_components } = addressResult[0];
    const city = address_components.find((comp) =>
      comp.types.includes("locality")
    ).long_name;
    const country = address_components.find((comp) =>
      comp.types.includes("country")
    ).long_name;

    setCity(city);
    setCountry(country);
  };

  const fileTypes = ["JPG", "PNG", "GIF", "WEBP", "JPEG"];

  const handleChange = async (files) => {
    const urls = await Promise.all(
      Array.from(files).map((file) => URL.createObjectURL(file))
    );
    setPictures(Array.from(files));
    setPreview(urls);
  };

  return userToken ? (
    <>
      <div className="flex justify-center mt-5">
        <Link to="/">
          <img src={logoAirbnb} alt="Logo Airbnb" className="h-16" />
        </Link>
      </div>
      <div className="global-container md:flex md:flex-row md:justify-between">
        <div className="global-left md:md:w-1/2 md:border-2">
          <div className="left ml-5 flex flex-col items-center sm:max-w-[450px] md:grow md:fixed md:h-full md:left-0 md:top-0 md:border-2">
            <video
              className=""
              src={homeAirbnbVideo}
              type="video/mp4"
              autoPlay
              muted
              //   loop
            ></video>
            <div className="">
              <h1 className="text-4xl font-medium">Tell us about your place</h1>
              <p className="text-sm mt-5">
                In this step, we'll ask you which type of property you have and
                if guests will book the entire place or just a room. Then let us
                know the location and how many guests can stay.
              </p>
            </div>
          </div>
        </div>

        <div className="right mr-5 flex flex-col mb-[50px] md:border-2 md:w-1/2">
          <div>
            <p className="text-xl mt-10">
              Which of these best describes your place?
            </p>
            <select
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
              className="classic appearance-none w-full cursor-pointer mt-5 rounded-xl bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
            >
              <option value="">Select an option</option>
              <option value="Apartment">Apartment</option>
              <option value="Home">Home</option>
              <option value="Annex">Annex</option>
              <option value="Single accomodation">Single accomodation</option>
              <option value="Guest room">Guest room</option>
              <option value="Non-residential dwelling">
                Non-residential dwelling
              </option>
            </select>
          </div>
          <div>
            <h1 className="text-xl mt-10">Where's your place located?</h1>
            {/* <p className="text-sm text-slate-400">
            Your address is only shared with guests after they’ve made a
            reservation.
          </p> */}
            {/* <p>lat : {location.lat}</p>
          <p>lng : {location.lng}</p>
          <p>Address : {address}</p>
          <p>City : {city}</p>
          <p>Country : {country}</p> */}

            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleAddress}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div key={suggestions.description}>
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className:
                        "location-search-input w-full placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <div className="sm:max-w-[450px]">
            <h1 className="text-xl mt-10">
              Share some basics about your place.
            </h1>
            <p className="text-sm text-slate-400">
              You'll add more details later, like bed types.
            </p>

            <Counter
              label="Guests"
              count={guests}
              onDecrement={setGuests}
              onIncrement={setGuests}
            />
            <div className="sep h-[1px] w-full bg-slate-200 my-5"></div>
            <Counter
              label="Bedrooms"
              count={bedrooms}
              onDecrement={setBedrooms}
              onIncrement={setBedrooms}
            />
            <div className="sep h-[1px] w-full bg-slate-200 my-5"></div>
            <Counter
              label="Beds"
              count={beds}
              onDecrement={setBeds}
              onIncrement={setBeds}
            />
            <div className="sep h-[1px] w-full bg-slate-200 my-5"></div>
            <Counter
              label="Bathrooms"
              count={bathrooms}
              onDecrement={setBathrooms}
              onIncrement={setBathrooms}
            />
          </div>
          <div>
            <h1 className="text-xl mt-10">
              Tell guests what your place has to offer
            </h1>
            <p className="text-sm text-slate-400">
              You can add more amenities after you publish your listing.
            </p>
            <input
              type="text"
              placeholder="Wifi, TV, Kitchen, Washer, Pool, BBQ grill, Fire pit..."
              value={options}
              onChange={(event) => {
                setOptions(event.target.value);
              }}
              className="w-full placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
            />
          </div>
          <div>
            {preview ? (
              <>
                <div className="flex  sm:max-w-[450px] place-items-end">
                  <div className="text grow">
                    <h1 className="text-xl mt-10">
                      Ta-da! How does this look?
                    </h1>
                    <p className="text-sm text-slate-400">
                      You can add 5 pictures maximum.
                    </p>
                  </div>
                  <button
                    className="mt-5 w-30 h-10 text-sm rounded-xl px-2 bg-red-400 text-white "
                    onClick={() => {
                      setPreview("");
                    }}
                  >
                    Remove pictures
                  </button>
                </div>
                <div className="flex flex-row flex-nowrap mt-5 overflow-hidden overflow-x-scroll sm:max-w-[450px]">
                  {preview.map((blob) => {
                    return (
                      <img
                        src={blob}
                        alt=""
                        className="max-h-64 w-64 object-cover mr-1 last:mr-0"
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="flex  sm:max-w-[450px] place-items-end">
                  <div className="text grow">
                    <h1 className="text-xl mt-10">
                      Ta-da! How does this look?
                    </h1>
                    <p className="text-sm text-slate-400">
                      You can add 5 pictures maximum.
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <FileUploader
                    handleChange={handleChange}
                    types={fileTypes}
                    value={pictures}
                    multiple={true}
                  />
                </div>
              </>
            )}
          </div>
          <div>
            <h1 className="text-xl mt-10">
              Now, let's give your house a title
            </h1>
            <p className="text-sm text-slate-400">
              Short titles work best. Have fun with it. later.
            </p>

            <textarea
              type="text"
              placeholder="My title..."
              value={title}
              onChange={handleMaxLength(setTitle, 50)}
              className="w-full placeholder-slate-400 mt-5 rounded-xl h-40 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
            />
            <p className="text-sm">{title.length}/50</p>
          </div>
          <div>
            <h1 className="text-xl mt-10">Create your description</h1>
            <p className="text-sm text-slate-400">
              Share what makes your place special.
            </p>

            <textarea
              type="text"
              placeholder="My description..."
              value={description}
              onChange={handleMaxLength(setDescription, 500)}
              className="w-full placeholder-slate-400 mt-5 rounded-xl h-60 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
            />
            <p className="text-sm">{description.length}/500</p>
          </div>
          <div>
            <h1 className="text-xl mt-10">Now, set your price</h1>
            <p className="text-sm text-slate-400">You can change it anytime.</p>
            <div className="counter-basics flex items-center w-full border-[1px] border-slate-300 p-8 rounded-xl mt-5 justify-center bg-neutral-50  sm:max-w-[450px]">
              <button
                type="button"
                className={`flex items-center justify-center w-9 h-9 rounded-full border-[1px] ${
                  price <= 10
                    ? "text-slate-300 border-slate-300"
                    : "text-slate-700 border-slate-700"
                }`}
                onClick={() => {
                  if (price > 10) {
                    setPrice(price - 5);
                  }
                }}
              >
                -
              </button>

              <div className="flex flex-col items-center w-2/4 border-[1px] rounded-xl p-5 flex justify-center mx-10 bg-white">
                <p
                  className={`text-3xl font-bold  ${
                    price <= 10 ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  €{price}
                </p>
                <p className="text-sm">Per night</p>
              </div>

              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 text-sm rounded-full border-[1px] border-slate-700"
                onClick={() => {
                  setPrice(price + 5);
                }}
              >
                +
              </button>
            </div>
          </div>
          <button
            className="mt-16 w-full  rounded-xl p-5 bg-red-400 text-white sm:max-w-[450px]"
            onClick={handleSubmit}
          >
            Publish my Airbnb
          </button>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/user/login" />
  );
};

export default Publish;
