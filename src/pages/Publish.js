import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

// imports components

// imports assets
import homeAirbnbVideo from "../img/video_home_airbnb.mp4";
import logoAirbnb from "../img/logo-airbnb.svg";

const Publish = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const coordinatesResults = await getLatLng(results[0]);
    console.log(coordinatesResults);
    setAddress(value);
    setCoordinates(coordinatesResults);
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <Link to="/">
          <img src={logoAirbnb} alt="Logo Airbnb" className="h-16" />
        </Link>
      </div>
      <div className="left mx-5 flex flex-col items-center">
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
            In this step, we'll ask you which type of property you have and if
            guests will book the entire place or just a room. Then let us know
            the location and how many guests can stay.
          </p>
        </div>
      </div>
      <div className="right mx-5 flex flex-col">
        <div>
          <p className="text-xl mt-10">
            Which of these best describes your place?
          </p>

          <input
            type="email"
            placeholder="House, Apartment, Castle, Dome, Tiny home, Yurt..."
            value=""
            onChange={(event) => {
              //   setEmail(event.target.value);
            }}
            className="w-full placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
          />
        </div>
        <div>
          <p className="text-xl mt-10">Where's your place located?</p>
          <p>lat : {coordinates.lat}</p>
          <p>lng : {coordinates.lng}</p>
          <p>Address : {address}</p>
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
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
          {/* <input
            type="text"
            placeholder="Enter the postal address of your Airbnb location."
            value=""
            onChange={(event) => {
              //   setEmail(event.target.value);
            }}
            className="w-full placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Publish;
