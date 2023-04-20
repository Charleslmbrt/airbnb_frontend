import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationPublish = ({
  setAddress,
  setLocation,
  setCity,
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

  return (
    <>
      <div className="mx-10 sm:flex sm:flex-col sm:items-center">
        <h1 className="text-3xl font-medium">Where's your place located?</h1>

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
                    "text-xl location-search-input w-full placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 ",
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
            <p className="mt-5 text-2xl text-gray-400 border-[1px] p-5 rounded-xl">
              <span className="font-light">{address}</span>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default LocationPublish;
