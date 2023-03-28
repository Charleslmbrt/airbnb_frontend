import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationPublish = ({
  setAddress,
  location,
  setLocation,
  city,
  setCity,
  country,
  setCountry,
  address,
}) => {
  const handleAddress = async (value) => {
    const addressResult = await geocodeByAddress(value);
    const coordinatesResult = await getLatLng(addressResult[0]);
    console.log("coortdinatesResult", coordinatesResult);

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

  console.log("location 2", location);

  return (
    <>
      <div>
        <h1 className="text-xl mt-10">Where's your place located?</h1>

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
        {address && (
          <>
            <p className="mt-5 text-sm font-bold">
              Address : <span className="font-light">{address}</span>
            </p>
            <div className="flex">
              <p className="mt-5 text-sm font-bold mr-10">
                City : <span className="font-light">{city}</span>
              </p>
              <p className="mt-5 text-sm font-bold">
                Country : <span className="font-light">{country}</span>
              </p>
              <p className="mt-5 text-sm font-bold">
                lat : <span className="font-light">{location.lat}</span>
              </p>
              <p className="mt-5 text-sm font-bold">
                lng : <span className="font-light">{location.lng}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LocationPublish;
