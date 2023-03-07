import { Link } from "react-router-dom";
import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

// imports assets
import homeAirbnbVideo from "../img/video_home_airbnb.mp4";
import logoAirbnb from "../img/logo-airbnb.svg";

const Publish = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [guestCounter, setGuestCounter] = useState(0);
  const [bedroomsCounter, setBedroomsCounter] = useState(0);

  const handleSelect = async (value) => {
    const addressResult = await geocodeByAddress(value);
    const coordinatesResult = await getLatLng(addressResult[0]);
    console.log(coordinatesResult);
    setAddress(addressResult);
    setCoordinates(coordinatesResult);
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
      <div className="right mx-5 flex flex-col mb-[200px]">
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
          <h1 className="text-xl mt-10">Where's your place located?</h1>
          <p className="text-sm text-slate-400">
            Your address is only shared with guests after they’ve made a
            reservation.
          </p>
          {/* <p>lat : {coordinates.lat}</p>
          <p>lng : {coordinates.lng}</p>
          <p>Address : {address}</p> */}
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
        </div>
        <div>
          <h1 className="text-xl mt-10">Share some basics about your place.</h1>
          <p className="text-sm text-slate-400">
            You'll add more details later, like bed types.
          </p>
          <div className="flex justify-between items-center mt-5">
            <p>Guests</p>

            <div className="counter-basics flex items-center">
              <button
                className={`flex items-center justify-center w-9 h-9 rounded-full border-[1px] ${
                  guestCounter <= 0
                    ? "text-slate-300 border-slate-300"
                    : "text-slate-700 border-slate-700"
                }`}
                onClick={() => {
                  if (guestCounter > 0) {
                    setGuestCounter(guestCounter - 1);
                  }
                }}
              >
                -
              </button>
              <p
                className={`w-14 text-center ${
                  guestCounter <= 0 ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {guestCounter}
              </p>
              <button
                className="flex items-center justify-center w-9 h-9 text-sm rounded-full border-[1px] border-slate-700"
                onClick={() => {
                  setGuestCounter(guestCounter + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="sep h-[1px] w-full bg-slate-200 my-5"></div>
          <div className="flex justify-between items-center mt-5">
            <p>Bedrooms</p>

            <div className="counter-basics flex items-center">
              <button
                className={`flex items-center justify-center w-9 h-9 rounded-full border-[1px] ${
                  bedroomsCounter <= 0
                    ? "text-slate-300 border-slate-300"
                    : "text-slate-700 border-slate-700"
                }`}
                onClick={() => {
                  if (bedroomsCounter > 0) {
                    setBedroomsCounter(bedroomsCounter - 1);
                  }
                }}
              >
                -
              </button>
              <p
                className={`w-14 text-center ${
                  bedroomsCounter <= 0 ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {bedroomsCounter}
              </p>
              <button
                className="flex items-center justify-center w-9 h-9 text-sm rounded-full border-[1px] border-slate-700"
                onClick={() => {
                  setBedroomsCounter(bedroomsCounter + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="sep h-[1px] w-full bg-slate-200 my-5"></div>
        </div>
      </div>
    </>
  );
};

export default Publish;
